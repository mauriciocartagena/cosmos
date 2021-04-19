import {
  Arg,
  Ctx,
  InputType,
  Mutation,
  Query,
  Resolver,
  Field,
} from "type-graphql";
import { People } from "../entities/People";
import { MyContext } from "../types";

@InputType()
class dataPeopleInput {
  @Field()
  name: String;
  @Field()
  first_last_name: String;
  @Field()
  second_last_name: String;
  @Field()
  phone: Number;
  @Field()
  direction: String;
  @Field()
  email: String;
}
@Resolver()
export class PeopleResolver {
  @Query(() => [People])
  peoples(@Ctx() { em }: MyContext): Promise<People[]> {
    return em.find(People, {});
  }
  people() {
    return "bye";
  }

  @Mutation(() => People)
  async createPeople(
    @Arg("options")
    options: dataPeopleInput,
    @Ctx()
    { em }: MyContext
  ) {
    const people = em.create(People, {
      name: options.name,
      first_last_name: options.first_last_name,
      second_last_name: options.second_last_name,
      phone: options.phone,
      direction: options.direction,
      email: options.email,
    });
    await em.persistAndFlush(people);
    return people;
  }
}
