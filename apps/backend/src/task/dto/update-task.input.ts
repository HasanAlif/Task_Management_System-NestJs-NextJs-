import { CreateTaskInput } from './create-task.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()// The InputType decorator marks this class as a GraphQL input type, which can be used as an argument in GraphQL mutations.
// It allows the class to be used as an input type in GraphQL mutations, enabling the creation or update of tasks.
export class UpdateTaskInput extends PartialType(CreateTaskInput) {// The UpdateTaskInput class extends the CreateTaskInput class, allowing it to inherit its fields.
  // The PartialType utility creates a new input type with all fields of the CreateTaskInput type set to optional.
  @Field(() => Int)// The Field decorator marks this property as a field in the GraphQL schema, allowing it to be used in GraphQL queries and mutations.
  // The Int type indicates that this field will return an integer value in the GraphQL schema.
  id: number;
}
