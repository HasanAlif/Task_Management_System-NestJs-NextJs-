import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';

@Injectable()// The Injectable decorator marks this class as a provider that can be injected into other classes

export class UserService {// The UserService class is responsible for handling user-related operations, such as creating and updating users
  constructor(private prisma: PrismaService) {}// The constructor injects the PrismaService, which is used to interact with the database

  async create(CreateUserInput: CreateUserInput) {// The create method takes a CreateUserInput object and creates a new user in the database
    
    const { password, ...user } = CreateUserInput;// Destructuring the input to separate the password from the user data

    const hashedPassword = await hash(password);// Hashing the password using argon2 for security

    return await this.prisma.user.create({// The prisma.user.create method is called to create a new user in the database

      data: {// The data object contains the user information to be stored in the database

        ...user,// Spreading the user data into the data object

        password: hashedPassword,// Storing the hashed password in the database
      },
    });
  }
}
