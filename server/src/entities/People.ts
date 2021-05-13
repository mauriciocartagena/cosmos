import { ObjectType, Field, Int } from "type-graphql";
import { Partner } from "./Partner";
import { User } from "./User";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
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
  @Column({ nullable: false })
  name!: string;

  @Field(() => String)
  @Column()
  first_last_name!: string;

  @OneToMany(() => Partner, (partner) => partner.creator)
  partner: Partner[];

  @OneToMany(() => User, (user) => user.creator)
  user: User[];

  @Field(() => String)
  @Column({ nullable: true })
  second_last_name: string;

  @Field(() => String)
  @Column({ nullable: true })
  phone: string;

  @Field(() => String)
  @Column({ nullable: true })
  direction: string;
}
