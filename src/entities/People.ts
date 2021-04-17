import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class People {
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
  @Property()
  name!: string;

  @Field(() => String)
  @Property()
  first_last_name!: string;

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
  @Property()
  email!: string;
}
