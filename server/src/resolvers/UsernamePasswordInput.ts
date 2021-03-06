import { InputType, Field } from "type-graphql";

@InputType()
export class UsernamePasswordInput {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  url: string;

  @Field()
  name: string;

  @Field()
  first_last_name: string;

  @Field()
  second_last_name: string;

  @Field()
  phone: string;

  @Field()
  direction: string;
}
