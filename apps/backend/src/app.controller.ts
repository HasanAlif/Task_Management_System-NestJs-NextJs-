/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service'; // Importing the AppService which contains the business logic for the application

@Controller() // The Controller decorator marks this class as a controller that handles incoming requests
export class AppController {
  // The AppController class is responsible for handling requests to the root route

  constructor(private readonly appService: AppService) {} // The constructor injects the AppService, allowing this controller to use its methods

  @Get()

  getHello(): string {
    
    return this.appService.getHello(); // It calls the getHello method from the AppService to get the response
  }
}
