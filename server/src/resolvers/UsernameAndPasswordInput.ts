import { InputType, Field } from "type-graphql";
@InputType()
export class UsernameaAndPasswordInput {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}
