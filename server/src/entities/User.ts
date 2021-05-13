import { ObjectType, Field } from "type-graphql";
import { Post } from "./Post";
import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { People } from "./People";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => People)
  @ManyToOne(() => People, (people) => people.user, {
    primary: true,
  })
  creator: People;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  peopleId: number;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date = new Date();

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field(() => String)
  @Column()
  password: string;

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @OneToMany(() => Post, (post) => post.creator)
  posts: Post[];
}
