import { ObjectType, Field } from "type-graphql";

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

@ObjectType()
@Entity()
export class UserOne extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  first_last_name: string;

  @Field(() => String)
  @Column()
  second_last_name!: string;

  @Field(() => Number)
  @Column()
  phone!: number;

  @Field(() => String)
  @Column()
  direction!: string;

  @Field(() => String)
  @Column({ type: "text", unique: true, nullable: true })
  email!: string;
}
