import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { DEFAULT_PAGE_SIZE } from 'src/constants';

@Injectable()
export class TaskService {// The TaskService class is responsible for handling task-related operations, such as fetching tasks, creating, updating, and deleting tasks.
  constructor(private prisma: PrismaService) {}// The constructor injects the PrismaService, which is used to interact with the database.

  async findAll({// The findAll method retrieves all tasks from the database, with optional pagination parameters.
    skip = 0,// The skip parameter is used to skip a certain number of tasks, useful for pagination.
    take = DEFAULT_PAGE_SIZE,// The take parameter specifies how many tasks to retrieve, with a default value defined in constants.
  }: {
    skip?: number;// The skip parameter is optional and defaults to 0.
    take?: number;// The take parameter is optional and defaults to the value of DEFAULT_PAGE_SIZE.
  }) {
    return await this.prisma.task.findMany({// The findMany method retrieves multiple tasks from the database.
      skip,
      take,
    });
  }

  async count() {// The count method returns the total number of tasks in the database.
    return await this.prisma.task.count();// The count method uses the PrismaService to count the number of tasks.
  }

  async findOne(id: number) {// The findOne method retrieves a single task by its ID.
    return await this.prisma.task.findFirst({// The findFirst method retrieves the first task that matches the given ID.
      where: {// The where clause filters tasks by their ID.
        id,
      },
      include: {// The include clause specifies related data to be included in the result.
        author: true,
        tags: true, 
      },
    });
  }

  async findByUser({ // The findByUser method retrieves tasks created by a specific user, with pagination support.
    userId,
    skip,
    take,
  }: {
    userId: number;
    skip: number;
    take: number;
  }) {
    return await this.prisma.task.findMany({// The findMany method retrieves multiple tasks created by the specified user.
      where: {
        author: {
          id: userId,
        },
      },
      select: {// The select clause specifies which fields to return in the result.
        id: true,
        content: true,
        createdAt: true,
        published: true,
        slug: true,
        title: true,
        thumbnail: true,
      },
      take,
      skip,
    });
  }

  async userTaskCount(userId: number) {// The userTaskCount method returns the total number of tasks created by a specific user.
    return this.prisma.task.count({// The count method counts the number of tasks where the authorId matches the specified userId.
      where: {
        authorId: userId,
      },
    });
  }

  // async create({
  //   createTaskInput,
  //   authorId,
  // }: {
  //   createTaskInput: CreateTaskInput;
  //   authorId: number;
  // }) {
  //   return await this.prisma.task.create({
  //     data: {
  //       ...createTaskInput,
  //       author: {
  //         connect: {
  //           id: authorId,
  //         },
  //       },
  //       tags: {
  //         connectOrCreate: createTaskInput.tags.map((tag) => ({
  //           where: { name: tag },
  //           create: { name: tag },
  //         })),
  //       },
  //     },
  //   });
  // }

  // async update({
  //   userId,
  //   updateTaskInput,
  // }: {
  //   userId: number;
  //   updateTaskInput: UpdateTaskInput;
  // }) {
  //   const authorIdMatched = await this.prisma.task.findUnique({
  //     where: { id: updateTaskInput.taskId, authorId: userId },
  //   });

  //   if (!authorIdMatched) throw new UnauthorizedException();
  //   const { taskId, ...data } = updateTaskInput;
  //   return await this.prisma.task.update({
  //     where: {
  //       id: updateTaskInput.taskId,
  //     },
  //     data: {
  //       ...data,
  //       tags: {
  //         set: [],
  //         connectOrCreate: updateTaskInput.tags.map((tag) => ({
  //           where: { name: tag },
  //           create: { name: tag },
  //         })),
  //       },
  //     },
  //   });
  // }

  async delete({ taskId, userId }: { taskId: number; userId: number }) {// The delete method removes a task from the database, ensuring that the user attempting to delete it is the author of the task.
    const authorIdMatched = await this.prisma.task.findUnique({// The findUnique method checks if a task exists with the specified ID and authorId.
      where: { id: taskId, authorId: userId },// The where clause filters tasks by their ID and authorId.
    });

    if (!authorIdMatched) throw new UnauthorizedException();// If no task is found with the specified ID and authorId, an UnauthorizedException is thrown.

    const result = await this.prisma.task.delete({// The delete method removes the task from the database.
      where: {
        id: taskId,
        authorId: userId,
      },
    });

    return !!result;// The method returns true if the task was successfully deleted, otherwise it returns false.
  }
}