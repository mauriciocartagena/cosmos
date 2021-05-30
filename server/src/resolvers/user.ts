import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  Field,
  Int,
  UseMiddleware,
  FieldResolver,
  Root,
  ObjectType,
} from "type-graphql";
import { MyContext } from "../types";
import { User } from "../entities/User";
import argon2 from "argon2";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";
import { isAuth } from "../middleware/isAuth";
import { People } from "../entities/People";
import { getConnection } from "typeorm";
import { UsernamePasswordInput } from "./UsernamePasswordInput";
import { validateUser } from "../utils/validateUser";

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

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    // Este sera el usuario actual y esta bien mostrarle su propio correo
    if (req.session.userId === user.peopleId) {
      return user.email;
    }

    // el usuario actual quiere ver el correo electrónico de otra persona

    return "";
  }

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
      { peopleId: userIdNum },
      {
        password: await argon2.hash(newPassword),
      }
    );

    await redis.del(key);

    req.session.userId = user.creator.id;

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
      user.peopleId,
      "ex",
      1000 * 60 * 60 * 24 * 3
    ); //3 days
    await sendEmail(
      email,
      `<a href="http://localhost:3000/change-password/${token}">reset password</a>`
    );

    return true;
  }

  @Query(() => User)
  async fetchUser(@Arg("id") id: string): Promise<User | null> {
    // const user = await User.findOne(parseInt(id));
    const replacements: any[] = [id];

    let user;

    const result = await getConnection().query(
      `select u.*, 
          json_build_object(
            'name', p.name,
            'first_last_name', p.first_last_name,
            'second_last_name',p.second_last_name,
            'phone',p.phone,
            'direction', p.direction
            ) creator
      from "people" p
      inner join public.user u on u."creatorId"  = p."id"
      where p."id" = $1 `,
      replacements
    );

    user = result[0];

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
    {}: MyContext
  ): Promise<UserResponse> {
    const errors = validateUser(options);
    if (errors) {
      return { errors };
    }
    // creatorId: req.session.userId
    const hashedPassword = await argon2.hash(options.password);

    const getEmail = await getConnection()
      .getRepository(User)
      .createQueryBuilder("user")
      .where("user.email = :email", { email: options.email })
      .getOne();

    const getUser = await getConnection()
      .getRepository(User)
      .createQueryBuilder("user")
      .where("user.username = :username", { username: options.username })
      .getOne();

    if (!!getUser) {
      return {
        errors: [
          {
            field: "username",
            message: "El usuario ya existe",
          },
        ],
      };
    }
    if (!!getEmail) {
      return {
        errors: [
          {
            field: "email",
            message: "El email ya existe",
          },
        ],
      };
    }

    const peopleNew = new People();
    peopleNew.name = options.name;
    peopleNew.first_last_name = options.first_last_name;
    peopleNew.second_last_name = options.second_last_name;
    peopleNew.phone = options.phone;
    peopleNew.direction = options.direction;

    await getConnection().manager.save(peopleNew);

    const createrUser = new User();
    createrUser.username = options.username;
    createrUser.password = hashedPassword;
    createrUser.url = options.url;
    createrUser.email = options.email;
    createrUser.peopleId = peopleNew.id;
    createrUser.creator = peopleNew;

    const resp = await getConnection().manager.save(createrUser);

    let user = resp;

    console.log(options.email);

    return { user };
  }
  // req.session.userId = user.id;

  @Mutation(() => People)
  @UseMiddleware(isAuth)
  async updatedUser(
    @Arg("id", () => Int) id: number,
    @Arg("name") name: string,
    @Arg("first_last_name") first_last_name: string,
    @Arg("second_last_name") second_last_name: string,
    @Arg("phone") phone: string,
    @Arg("direction") direction: string
  ) {
    const result = await getConnection()
      .createQueryBuilder()
      .update(People)
      .set({
        name: name,
        first_last_name: first_last_name,
        second_last_name: second_last_name,
        phone: phone,
        direction: direction,
      })
      .where("id = :id", { id: id })
      .returning("*")
      .execute();

    return result.raw[0];
  }
  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async updatedUserAccount(
    @Arg("id", () => Int) id: number,
    @Arg("username") username: string,
    @Arg("email") email: string,
    @Arg("url") url: string
  ) {
    const result = await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({
        username: username,
        email: email,
        url: url,
      })
      .where("creatorId = :id", { id: id })
      .returning("*")
      .execute();

    return result.raw[0];
  }

  // // @Mutation(() => Boolean)
  // // async deletePost(
  // //   @Arg("id") id: number,
  // //   @Ctx() { em }: MyContext
  // // ): Promise<boolean> {
  // //   await em.nativeDelete(Post, { id });
  // //   return true;
  // // }

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

    req.session.userId = user.peopleId;

    console.log({ user });

    return { user };
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
