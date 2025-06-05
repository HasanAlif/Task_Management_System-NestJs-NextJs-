import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()// The InputType decorator marks this class as a GraphQL input type, which can be used as an argument in GraphQL mutations.
// It allows the class to be used as an input type in GraphQL mutations, enabling the creation or update of tasks.
export class CreateTaskInput {// The CreateTaskInput class represents the input data required to create a new task.
  @Field(() => Int, { description: 'Example field (placeholder)' })// The Field decorator marks this property as a field in the GraphQL schema, allowing it to be used in GraphQL queries and mutations.
  // The Int type indicates that this field will return an integer value in the GraphQL schema.
  exampleField: number;
}
