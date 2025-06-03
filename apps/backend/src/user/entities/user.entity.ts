import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Task } from 'src/task/entities/task.entity';

@ObjectType()// The ObjectType decorator marks this class as a GraphQL object type, which can be queried in GraphQL

export class User {// The User class represents a user entity in the application, with fields that can be queried in GraphQL

  @Field(() => Int)// The Field decorator marks this property as a field in the GraphQL schema, with an optional type specified
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })// The nullable option allows this field to be optional in the GraphQL schema
  bio?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field(()=> [Task])// The Field decorator specifies that this field is an array of Task objects, which can be queried in GraphQL
  
  tasks?: Task[];// The tasks field represents a list of tasks associated with the user, allowing for relationships in the GraphQL schema
}
