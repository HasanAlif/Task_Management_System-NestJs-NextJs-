import { NestFactory } from '@nestjs/core';// Importing NestFactory to create the application instance
import { AppModule } from './app.module';// Importing the main application module
import { ValidationPipe } from '@nestjs/common';// Importing ValidationPipe for validating incoming requests

async function bootstrap() {// The bootstrap function initializes the NestJS application

  const app = await NestFactory.create(AppModule);// Creating the application instance using the AppModule

  app.useGlobalPipes(new ValidationPipe());// Using ValidationPipe globally to validate incoming requests

  await app.listen(8000);// Starting the application and listening on port 8000
}
bootstrap();// Calling the bootstrap function to start the application
