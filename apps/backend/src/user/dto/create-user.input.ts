import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()// The InputType decorator marks this class as a GraphQL input type, which can be used to pass data in GraphQL mutations

export class CreateUserInput {// The CreateUserInput class defines the structure of the input data required to create a new user
  
  @Field(() => String)// The Field decorator marks this property as a field in the GraphQL schema, with an optional type specified
  name: string;

  @Field()
  password: string;

  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  avatar?: string;
}
