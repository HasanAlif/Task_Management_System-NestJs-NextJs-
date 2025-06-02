import { Injectable } from '@nestjs/common';// Importing Injectable decorator from NestJS to define a service

@Injectable()// The Injectable decorator marks the class as a provider that can be injected into other classes

export class AppService {// AppService is a service class that can be injected into controllers or other services

  getHello(): string {// This method returns a simple string when called
    // This method is typically used to respond to a request, for example in a controller
    return 'Hello World!';

  }
}
