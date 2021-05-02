import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  Field,
  Int,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "../types";
import { User } from "../entities/User";
import argon2 from "argon2";
import { ObjectType } from "type-graphql";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { validateRegister } from "../utils/validateRegister";
import { UsernamePasswordInput } from "./UsernamePasswordInput";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";
import { isAuth } from "../middleware/isAuth";
import { getConnection } from "typeorm";

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { redis, req }: MyContext
  ): Promise<UserResponse> {
    if (newPassword.length <= 2) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "Introducir más de 2 caracteres",
          },
        ],
      };
    }

    const key = FORGET_PASSWORD_PREFIX + token;

    const userId = await redis.get(key);

    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "El token ha expirado",
          },
        ],
      };
    }

    const userIdNum = parseInt(userId);

    const user = await User.findOne(userIdNum);

    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "El usuario no existe :(",
          },
        ],
      };
    }
    user.password = await argon2.hash(newPassword);

    await User.update(
      { id: userIdNum },
      {
        password: await argon2.hash(newPassword),
      }
    );

    await redis.del(key);

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      // the email is not in the db
      return true;
    }

    const token = v4();

    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 * 3
    ); //3 days

    await sendEmail(
      email,
      `<a href="http://localhost:3000/change-password/${token}">reset password</a>`
    );

    return true;
  }

  @Mutation(() => User)
  async fetchUser(@Arg("id") id: string): Promise<User | null> {
    const user = await User.findOne(parseInt(id));

    if (!user) {
      // the email is not in the db
      return null;
    }

    return user;
  }
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    //you are not logged in
    if (!req.session.userId) {
      return null;
    }

    return User.findOne(req.session.userId);
  }

  @Query(() => [User])
  users(): Promise<User[]> {
    return User.find();
  }

  @Mutation(() => UserResponse)
  async createUser(
    @Arg("options")
    options: UsernamePasswordInput,
    @Ctx()
    { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);

    let user;

    try {
      // User.create({}).save()

      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: options.username,
          password: hashedPassword,
          name: options.name,
          first_last_name: options.first_last_name,
          second_last_name: options.second_last_name,
          phone: options.phone,
          direction: options.direction,
          email: options.email,
        })
        .returning("*")
        .execute();

      user = result.raw[0];
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "El usuario ya existe",
            },
          ],
        };
      }
    }

    // req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async updatedUser(
    @Arg("id", () => Int) id: number,
    @Arg("name") name: string,
    @Arg("first_last_name") first_last_name: string,
    @Arg("second_last_name") second_last_name: string,
    @Arg("phone", () => Int) phone: number,
    @Arg("direction") direction: string,
    @Arg("email") email: string
  ) {
    const result = await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({
        name: name,
        first_last_name: first_last_name,
        second_last_name: second_last_name,
        phone: phone,
        direction: direction,
        email: email,
      })
      .where("id = :id", { id: id })
      .returning("*")
      .execute();

    return result.raw[0];
  }

  // @Mutation(() => Boolean)
  // async deletePost(
  //   @Arg("id") id: number,
  //   @Ctx() { em }: MyContext
  // ): Promise<boolean> {
  //   await em.nativeDelete(Post, { id });
  //   return true;
  // }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes("@")
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } }
    );

    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "El usuario no existe ",
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Contraseña incorrecta",
          },
        ],
      };
    }

    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }
}
