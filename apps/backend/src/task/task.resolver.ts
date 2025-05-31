import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { DEFAULT_PAGE_SIZE } from 'src/constants';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  // @UseGuards(JwtAuthGuard)
  @Query(() => [Task], { name: 'tasks' })
  findAll(
    @Context() context,
    @Args('skip', { nullable: true }) skip?: number,
    @Args('take', { nullable: true }) take?: number,
  ) {
    const user = context.req.user;
    console.log({ user });

    return this.taskService.findAll({ skip, take });
  }

  @Query(() => Int, { name: 'taskCount' })
  count() {
    return this.taskService.count();
  }

  @Query(() => Task)
  getTaskById(@Args('id', { type: () => Int }) id: number) {
    return this.taskService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Task])
  getUserTasks(
    @Context() context,
    @Args('skip', { nullable: true, type: () => Int }) skip?: number,
    @Args('take', { nullable: true, type: () => Int }) take?: number,
  ) {
    const userId = context.req.user.id;
    return this.taskService.findByUser({
      userId,
      skip: skip ?? 0,
      take: take ?? DEFAULT_PAGE_SIZE,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Int)
  userTaskCount(@Context() context) {
    const userId = context.req.user.id;
    return this.taskService.userTaskCount(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Task)
  createTask(
    @Context() context,
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ) {
    const authorId = context.req.user.id;

    //return this.taskService.create({ createTaskInput, authorId });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Task)
  updateTask(
    @Context() context,

    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ) {
    const userId = context.req.user.id;
    //return this.taskService.update({ userId, updateTaskInput });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  deleteTask(
    @Context() context,
    @Args('taskId', { type: () => Int }) taskId: number,
  ) {
    const userId = context.req.user.id;
    return this.taskService.delete({ taskId, userId });
  }
}