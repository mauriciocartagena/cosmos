import { ObjectType, Field } from "type-graphql";
import { Entity, Property, PrimaryKey } from "@mikro-orm/core";

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Field(() => String)
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field(() => String)
  @Property({ type: "text", unique: true })
  username!: string;

  @Field(() => String)
  @Property()
  password: string;

  @Field(() => String)
  @Property()
  name: string;

  @Field(() => String)
  @Property()
  first_last_name: string;

  @Field(() => String)
  @Property()
  second_last_name!: string;

  @Field(() => Number)
  @Property()
  phone!: number;

  @Field(() => String)
  @Property()
  direction!: string;

  @Field(() => String)
  @Property({ type: "text", unique: true, nullable: true })
  email!: string;
}
