import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import "dotenv-safe/config";
import express from "express";
import session from "express-session";
import { graphqlUploadExpress } from "graphql-upload";
import Redis from "ioredis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constants";
import { Partner } from "./entities/Partner";
import { People } from "./entities/People";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { HelloResolver } from "./resolvers/hello";
import { PartnerResolver } from "./resolvers/partner";
import { PostResolver } from "./resolvers/post";
// import path from "path";
import { UploadFileResolver } from "./resolvers/UploadFile";
import { UserResolver } from "./resolvers/user";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    // migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User, Post, Partner, People],
  });

  await conn.runMigrations();

  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);
  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
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
        domain: __prod__ ? ".mentesmaestras.xyz" : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    }),
    graphqlUploadExpress({ maxFileSize: Infinity, maxFiles: Infinity })
  );

  // redisClient.on("error", console.error);

  const apolloServer = new ApolloServer({
    uploads: false,
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        UserResolver,
        PostResolver,
        PartnerResolver,
        UploadFileResolver,
      ],
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

  app.listen(parseInt(process.env.PORT), () => {
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
