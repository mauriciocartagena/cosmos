import "reflect-metadata";

import { __prod__, COOKIE_NAME } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";
import { createConnection } from "typeorm";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { User } from "./entities/User";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "cosmos",
    username: "user",
    password: "password",
    logging: true,
    synchronize: true,
    entities: [User],
  });

  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  redis.on("error", function (error) {
    console.error(error);
  });

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 year
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: "mcvbmklcvbmklcmblcmvasd",
      resave: false,
    })
  );
  // redisClient.on("error", console.error);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.get("/", (_, res) => {
    res.send("hello");
  });

  app.listen(5000, () => {
    console.log("server started on localhost:5000");
  });

  // const post = orm.em.create(People, { name: "Mauricio" });
  // await orm.em.persistAndFlush(post);

  // const people = await orm.em.find(People, {});
  // console.log(people);
};

main().catch((err) => {
  console.log(err);
});
