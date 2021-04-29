import { InputType, Field } from "type-graphql";

@InputType()
export class InputUpdated {
  @Field()
  id: number;

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
