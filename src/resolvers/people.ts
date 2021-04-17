import { Ctx, Query, Resolver } from "type-graphql";
import { People } from "../entities/People";
import { MyContext } from "../types";

@Resolver()
export class PeopleResolver {
  @Query(() => [People])
  peoples(@Ctx() { em }: MyContext): Promise<People[]> {
    return em.find(People, {});
  }
  people() {
    return "bye";
  }
}
