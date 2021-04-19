import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { User } from "./entities/User";

export default {
  user: process.env.USER,
  password: process.env.PASSWORD,
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.ts$/, // reg
  },
  entities: [User],
  dbName: "cosmos",
  type: "postgresql",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];