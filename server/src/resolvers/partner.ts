import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Partner } from "../entities/Partner";
import { MyContext } from "../types";
import { People } from "../entities/People";
import { getConnection } from "typeorm";

@InputType()
class PartnerInput {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  first_last_name: string;

  @Field()
  second_last_name: string;

  @Field()
  phone: number;

  @Field()
  direction: string;
}

@Resolver(People)
export class PartnerResolver {
  @Mutation(() => People)
  async createPartner(
    @Arg("input") input: PartnerInput,
    @Ctx() { req }: MyContext
  ) {
    const people = new People();
    people.createdAt = new Date();
    people.email = "mc@gmail.com";
    people.name = "";
    people.first_last_name = "";
    people.second_last_name = "";
    people.phone = 444;
    people.direction = "";

    const partner = new Partner();
    partner.creator = people;

    await getConnection().manager.save(people);

    await getConnection().manager.save(partner);

    return people;
  }
}
