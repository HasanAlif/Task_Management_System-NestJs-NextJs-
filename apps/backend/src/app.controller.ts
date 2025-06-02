import { Controller, Get } from '@nestjs/common';// Importing Controller and Get decorators from NestJS to define a controller and its route
import { AppService } from './app.service';// Importing the AppService which contains the business logic for the application

@Controller()// The Controller decorator marks this class as a controller that handles incoming requests

export class AppController {// The AppController class is responsible for handling requests to the root route

  constructor(private readonly appService: AppService) {}// The constructor injects the AppService, allowing this controller to use its methods

  @Get()// The Get decorator defines a route that responds to GET requests at the root URL

  getHello(): string {// This method handles GET requests to the root URL and returns a string response
    
    return this.appService.getHello();// It calls the getHello method from the AppService to get the response
  }
}
