import { Field, InputType } from "type-graphql";

@InputType()
export class PartnerInput {
  @Field()
  name: string;

  @Field()
  first_last_name!: string;

  @Field()
  second_last_name: string;

  @Field()
  phone: string;

  @Field()
  direction: string;
}
