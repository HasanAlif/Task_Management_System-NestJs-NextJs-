/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  // The Module decorator marks this class as a module that encapsulates related components

  providers: [UserResolver, UserService, PrismaService], // The providers array contains the services and resolvers that this module provides
})
export class UserModule {}
