import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [Task], { name: 'tasks' })
  findAll(@Context() context) {
    const user = context.req.user;
    console.log({user});
    return this.taskService.findAll();
  }
  
}
