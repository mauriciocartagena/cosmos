import {
  Arg,
  Ctx,
  Field,
  Mutation,
  Resolver,
  ObjectType,
  Int,
  Query,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { MyContext } from "../types";
import { People } from "../entities/People";
import { validateRegisterPartner } from "../utils/validateRegisterPartner";
import { PartnerInput } from "./PartnetInput";
import { Partner } from "../entities/Partner";
import { isAuth } from "../middleware/isAuth";

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

@ObjectType()
class PaginatedPartner {
  @Field(() => [People])
  people: People[];
  @Field()
  hasMore: boolean;
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

  @Query(() => PaginatedPartner)
  async parnets(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedPartner> {
    // 15 -> 16
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const parnets = await getConnection().query(
      `
      select u.*, 
      json_build_object(
        'id', u.id,
        'email', u.email,
        'second_last_name',u.second_last_name,
        'first_last_name', u.first_last_name,
        'phone',u.phone,
        'direction',u.direction,
        'name',u.name
        ) creator
      from partner p
      inner join public.people u on u.id = p."creatorId"
      ${cursor ? ` where u."createdAt" < $2 ` : ""}
      order by u."createdAt" DESC
      limit $1
    `,
      replacements
    );

    return {
      people: parnets.slice(0, realLimit),
      hasMore: parnets.length === realLimitPlusOne,
    };
  }

  @Mutation(() => PartnerResponse)
  async updatedPartner(
    @Arg("id", () => Int) id: number,
    @Arg("input")
    input: PartnerInput,
    @Ctx()
    { req }: MyContext
  ): Promise<PartnerResponse | null> {
    const errors = validateRegisterPartner(input);

    if (errors) {
      return { errors };
    }

    let people;

    const result = await getConnection()
      .createQueryBuilder()
      .update(People)
      .set(input)
      .where("id = :id ", {
        id,
      })
      .returning("*")
      .execute();

    people = result.raw[0];

    return { people };
  }

  @Query(() => People, { nullable: true })
  partner(@Arg("id", () => Int) id: number): Promise<People | undefined> {
    return People.findOne(id);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePartner(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Partner)
      .where("creatorId = :id", { id: id })
      .execute();

    return true;
  }
}
