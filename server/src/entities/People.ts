import { ObjectType, Field } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

@ObjectType()
@Entity()
export class People extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date = new Date();

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => String)
  @Column()
  first_last_name!: string;

  @Field(() => String)
  @Column()
  second_last_name!: string;

  @Field(() => Number)
  @Column({ nullable: true })
  phone!: number;

  @Field(() => String)
  @Column()
  direction!: string;

  @Field(() => String)
  @Column()
  email!: string;
}
