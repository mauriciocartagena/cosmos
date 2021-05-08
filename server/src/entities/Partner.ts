import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, ManyToOne } from "typeorm";
import { People } from "./People";

@ObjectType()
@Entity()
export class Partner extends BaseEntity {
  @Field(() => People)
  @ManyToOne(() => People, (people) => people.partner, {
    primary: true,
  })
  creator: People;
}
