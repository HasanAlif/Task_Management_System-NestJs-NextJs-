import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()// The InputType decorator marks this class as a GraphQL input type, which can be used to pass data in GraphQL mutations

export class UpdateUserInput extends PartialType(CreateUserInput) {// The UpdateUserInput class extends CreateUserInput, allowing it to inherit its fields while making them optional for updates
  
  @Field(() => Int)
  id: number;
}
