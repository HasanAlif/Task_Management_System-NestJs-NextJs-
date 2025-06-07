import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()// The ObjectType decorator marks this class as a GraphQL object type, which can be queried or mutated in GraphQL.

export class Task {// The Task class represents a task entity in the application.
  @Field(() => Int)
  id: number;

  @Field()// The Field decorator marks this property as a field in the GraphQL schema.
  title:string

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })// The nullable option allows this field to be optional in the GraphQL schema.
  thumbnail?: string;

  @Field()
  content: string;

  @Field(() => Boolean)// The Boolean type indicates that this field will return a boolean value in the GraphQL schema.
  published: boolean;

  @Field()
  createdAt: Date;// The createdAt field represents the date and time when the task was created.

  @Field()
  updatedAt: Date;
}
