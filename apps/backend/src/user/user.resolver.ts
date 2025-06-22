/* eslint-disable prettier/prettier */
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User) // The Resolver decorator marks this class as a GraphQL resolver for the User entity
export class UserResolver {
  // The UserResolver class is responsible for handling GraphQL mutations related to the User entity

  constructor(private readonly userService: UserService) {} // The constructor injects the UserService, allowing this resolver to use its methods

  @Mutation(() => User) // The Mutation decorator defines a GraphQL mutation that creates a new user
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    // The createUser method takes a CreateUserInput object as an argument, which contains the data for the new user

    return await this.userService.create(createUserInput); // It calls the create method from the UserService to create a new user in the database
  }
}
