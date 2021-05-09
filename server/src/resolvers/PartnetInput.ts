import { Field, InputType } from "type-graphql";

@InputType()
export class PartnerInput {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  first_last_name!: string;

  @Field()
  second_last_name: string;

  @Field()
  phone: number;

  @Field()
  direction: string;
}
