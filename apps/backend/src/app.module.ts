/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  // Defining the main application module
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // Using ApolloDriver for GraphQL
      driver: ApolloDriver, // Specifying the driver as ApolloDriver
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'), // Automatically generating the schema file at the specified path
    }), // Importing the ConfigModule for global configuration management
    ConfigModule.forRoot({
      // Enabling global configuration management
      isGlobal: true, // Making the configuration globally available
    }),

    PrismaModule, // Importing the PrismaModule for database interactions
    TaskModule, // Importing the TaskModule for task management functionalities
    UserModule, // Importing the UserModule for user management functionalities
    AuthModule, // Importing the AuthModule for authentication functionalities
  ],
  controllers: [AppController], // Specifying the controllers for this module
  providers: [AppService], // Specifying the providers for this module
})
export class AppModule {} // Exporting the AppModule class to be used in the main application bootstrap
