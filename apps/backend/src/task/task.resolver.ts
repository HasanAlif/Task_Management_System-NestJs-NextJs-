import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { DEFAULT_PAGE_SIZE } from 'src/constants';

@Resolver(() => Task)// The Resolver decorator marks this class as a GraphQL resolver for the Task entity
// It allows the class to handle GraphQL queries and mutations related to tasks.

export class TaskResolver {// The TaskResolver class is responsible for handling GraphQL queries and mutations related to tasks.
  // The TaskResolver class is responsible for handling GraphQL queries and mutations related to tasks.

  constructor(private readonly taskService: TaskService) {}// The constructor injects the TaskService, which is used to interact with the task-related data.

  // @UseGuards(JwtAuthGuard)
  @Query(() => [Task], { name: 'tasks' })// The Query decorator marks this method as a GraphQL query that returns an array of Task entities.
  findAll(// The findAll method retrieves all tasks, with optional pagination parameters.
    @Context() context,
    @Args('skip', { nullable: true }) skip?: number,
    @Args('take', { nullable: true }) take?: number,
  ) {
    const user = context.req.user;// The user is extracted from the request context, which is typically set by the authentication guard.
    console.log({ user });

    return this.taskService.findAll({ skip, take });// The findAll method of the TaskService is called to retrieve tasks, passing the skip and take parameters for pagination.
    // The skip parameter is used to skip a certain number of tasks, useful for pagination.
  }

  @Query(() => Int, { name: 'taskCount' })// The Query decorator marks this method as a GraphQL query that returns the total count of tasks.
  count() {// The count method retrieves the total number of tasks in the database.
    // It does not require any parameters and returns an integer representing the total count.

    return this.taskService.count();// The count method of the TaskService is called to get the total number of tasks.
  }

  @Query(() => Task)// The Query decorator marks this method as a GraphQL query that returns a single Task entity.
  getTaskById(@Args('id', { type: () => Int }) id: number) {// The getTaskById method retrieves a task by its ID.
    return this.taskService.findOne(id);// The findOne method of the TaskService is called to retrieve the task with the specified ID.
  }

  @UseGuards(JwtAuthGuard)// The UseGuards decorator applies the JwtAuthGuard to this method, ensuring that only authenticated users can access it.
  // The JwtAuthGuard is a custom guard that checks if the user is authenticated using a JWT token.
  @Query(() => [Task])// The Query decorator marks this method as a GraphQL query that returns an array of Task entities.
  getUserTasks(// The getUserTasks method retrieves tasks created by the authenticated user.
    @Context() context,// The context parameter provides access to the request context, which includes the authenticated user.
    @Args('skip', { nullable: true, type: () => Int }) skip?: number,// The skip parameter is used to skip a certain number of tasks, useful for pagination.
    @Args('take', { nullable: true, type: () => Int }) take?: number,// The take parameter specifies how many tasks to retrieve, with a default value defined in constants.
  ) {
    const userId = context.req.user.id;// The userId is extracted from the request context, which is typically set by the authentication guard.
    return this.taskService.findByUser({// The findByUser method of the TaskService is called to retrieve tasks created by the specified user.
      userId,
      skip: skip ?? 0,
      take: take ?? DEFAULT_PAGE_SIZE,
    });// The skip and take parameters are used for pagination, with default values if not provided.
  }

  @UseGuards(JwtAuthGuard)// The UseGuards decorator applies the JwtAuthGuard to this method, ensuring that only authenticated users can access it.
  // The JwtAuthGuard is a custom guard that checks if the user is authenticated using a JWT token.
  @Query(() => Int)// The Query decorator marks this method as a GraphQL query that returns the count of tasks created by the authenticated user.
  userTaskCount(@Context() context) {// The userTaskCount method retrieves the count of tasks created by the authenticated user.
    const userId = context.req.user.id;// The userId is extracted from the request context, which is typically set by the authentication guard.
    return this.taskService.userTaskCount(userId);// The userTaskCount method of the TaskService is called to get the count of tasks created by the specified user.
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