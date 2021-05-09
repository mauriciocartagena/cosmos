import { Arg, Ctx, Field, Mutation, Resolver, ObjectType } from "type-graphql";
import { getConnection } from "typeorm";
import { MyContext } from "../types";
import { People } from "../entities/People";
import { validateRegisterPartner } from "../utils/validateRegisterPartner";
import { PartnerInput } from "./PartnetInput";
import { Partner } from "../entities/Partner";

@ObjectType()
class FieldErrorParnet {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class PartnerResponse {
  @Field(() => [FieldErrorParnet], { nullable: true })
  errors?: FieldErrorParnet[];

  @Field(() => People, { nullable: true })
  people?: People;
}

@Resolver(People)
export class PartnerResolver {
  // Hello

  @Mutation(() => PartnerResponse)
  async createPartner(
    @Arg("input")
    input: PartnerInput,
    @Ctx()
    { req }: MyContext
  ): Promise<PartnerResponse> {
    const errors = validateRegisterPartner(input);

    if (errors) {
      return { errors };
    }

    console.log("erros::::::", errors);

    let people;

    try {
      const peopleNew = new People();
      peopleNew.email = input.email;
      peopleNew.name = input.name;
      peopleNew.first_last_name = input.first_last_name;
      peopleNew.second_last_name = input.second_last_name;
      peopleNew.phone = input.phone;
      peopleNew.direction = input.direction;

      const partner = new Partner();
      partner.creator = peopleNew;

      const response = await getConnection().manager.save(peopleNew);
      people = response;

      await getConnection().manager.save(partner);
    } catch (error) {
      return {
        errors: [
          {
            field: "Error",
            message: "Algo salio mal vuelva a intentarlo",
          },
        ],
      };
    }

    return { people };
  }
}
