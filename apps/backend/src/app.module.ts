import { Module } from '@nestjs/common';// Importing the Module decorator from NestJS to define a module
import { AppController } from './app.controller';// Importing the main application controller
import { AppService } from './app.service';// Importing the main application service
import { PrismaModule } from './prisma/prisma.module';// Importing the Prisma module for database interactions
import { GraphQLModule } from '@nestjs/graphql';// Importing the GraphQL module to set up GraphQL in the application
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';// Importing ApolloDriver and ApolloDriverConfig for GraphQL configuration
import { join } from 'path';// Importing join from 'path' to handle file paths
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';// Importing the Auth module for authentication functionalities
import { ConfigModule } from '@nestjs/config';// Importing ConfigModule for environment configuration management

@Module({// Defining the main application module
  imports: [// Importing necessary modules
    
    GraphQLModule.forRoot<ApolloDriverConfig>({// Using ApolloDriver for GraphQL
      driver: ApolloDriver,// Specifying the driver as ApolloDriver
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),// Automatically generating the schema file at the specified path
    }),// Importing the ConfigModule for global configuration management
    ConfigModule.forRoot({// Enabling global configuration management
      isGlobal: true,// Making the configuration globally available
    }),

    PrismaModule,// Importing the PrismaModule for database interactions
    TaskModule,// Importing the TaskModule for task management functionalities
    UserModule,// Importing the UserModule for user management functionalities
    AuthModule,// Importing the AuthModule for authentication functionalities
  ],
  controllers: [AppController],// Specifying the controllers for this module
  providers: [AppService],// Specifying the providers for this module
})
export class AppModule {}// Exporting the AppModule class to be used in the main application bootstrap
