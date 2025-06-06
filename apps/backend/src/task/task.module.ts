import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [TaskResolver, TaskService, PrismaService],
})
export class TaskModule {}
