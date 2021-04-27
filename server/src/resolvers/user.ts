import { Arg, Ctx, Mutation, Query, Resolver, Field, Int } from "type-graphql";
import { MyContext } from "../types";
import { User } from "../entities/User";
import argon2 from "argon2";
import { ObjectType } from "type-graphql";
import { EntityManager } from "@mikro-orm/postgresql";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { validateRegister } from "../utils/validateRegister";
import { UsernamePasswordInput } from "./UsernamePasswordInput";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";

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
    @Ctx() { redis, em, req }: MyContext
  ): Promise<UserResponse> {
    if (newPassword.length <= 2) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "length must be greater than 2",
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
            message: "token expired",
          },
        ],
      };
    }
    const user = await em.findOne(User, { id: parseInt(userId) });

    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "user no longer exists",
          },
        ],
      };
    }

    user.password = await argon2.hash(newPassword);

    await redis
      .del(key)
      .then((succ) => console.log("success:", succ))
      .catch((err) => console.log("erro:", err));

    await em.persistAndFlush(user);

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { em, redis }: MyContext
  ) {
    const user = await em.findOne(User, { email });

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
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: MyContext) {
    //you are not logged in
    if (!req.session.userId) {
      return null;
    }

    const user = await em.findOne(User, { id: req.session!.userId });

    return user;
  }

  @Query(() => [User])
  users(@Ctx() { em }: MyContext): Promise<User[]> {
    return em.find(User, {});
  }

  @Mutation(() => UserResponse)
  async createUser(
    @Arg("options")
    options: UsernamePasswordInput,
    @Ctx()
    { em }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);

    let user;

    try {
      const result = await (em as EntityManager)
        .createQueryBuilder(User)
        .getKnexQuery()
        .insert({
          username: options.username,
          password: hashedPassword,
          name: options.name,
          first_last_name: options.first_last_name,
          second_last_name: options.second_last_name,
          phone: options.phone,
          direction: options.direction,
          email: options.email,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning("*");

      user = result[0];
    } catch (err) {
      console.log(err);
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "username already taken",
            },
          ],
        };
      }
    }
    return { user };
  }

  @Query(() => User, { nullable: true })
  user(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<User | null> {
    return em.findOne(User, { id });
  }
  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg("id") id: number,
    @Arg("name", () => String, { nullable: false }) name: string,
    @Arg("first_last_name", () => String, { nullable: false })
    first_last_name: string,
    @Arg("second_last_name", () => String, { nullable: true })
    second_last_name: string,
    @Arg("phone", () => Number, { nullable: true }) phone: number,
    @Arg("direction", () => String, { nullable: true }) direction: string,
    @Arg("email", () => String, { nullable: true }) email: string,
    @Ctx() { em }: MyContext
  ): Promise<User | null> {
    const user = await em.findOne(User, { id });

    if (!user) {
      return null;
    }
    if (typeof name !== "undefined" && typeof first_last_name !== "undefined") {
      user.name = name;
      user.first_last_name = first_last_name;
      user.second_last_name = second_last_name;
      user.phone = phone;
      user.direction = direction;
      user.email = email;

      await em.persistAndFlush(user);
    }
    return user;
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
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(
      User,
      usernameOrEmail.includes("@")
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail }
    );

    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "that username doesn't exist",
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
            message: "incorrect password",
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
