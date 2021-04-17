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

  @Field()
  @Property()
  name!: string;

  @Field()
  @Property()
  first_last_name!: string;

  @Field()
  @Property()
  second_last_name!: string;

  @Field()
  @Property()
  phone!: number;

  @Field()
  @Property()
  direction!: string;

  @Field()
  @Property()
  email!: string;
}
