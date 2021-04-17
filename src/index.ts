import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import express from "express";

import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PeopleResolver } from "./resolvers/people";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PeopleResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  apolloServer.applyMiddleware({ app });

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
