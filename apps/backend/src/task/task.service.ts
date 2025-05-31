import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { DEFAULT_PAGE_SIZE } from 'src/constants';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async findAll({
    skip = 0,
    take = DEFAULT_PAGE_SIZE,
  }: {
    skip?: number;
    take?: number;
  }) {
    return await this.prisma.task.findMany({
      skip,
      take,
    });
  }

  async count() {
    return await this.prisma.task.count();
  }

  async findOne(id: number) {
    return await this.prisma.task.findFirst({
      where: {
        id,
      },
      include: {
        author: true,
        tags: true, 
      },
    });
  }

  async findByUser({
    userId,
    skip,
    take,
  }: {
    userId: number;
    skip: number;
    take: number;
  }) {
    return await this.prisma.task.findMany({
      where: {
        author: {
          id: userId,
        },
      },
      select: {
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

  async userTaskCount(userId: number) {
    return this.prisma.task.count({
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

  async delete({ taskId, userId }: { taskId: number; userId: number }) {
    const authorIdMatched = await this.prisma.task.findUnique({
      where: { id: taskId, authorId: userId },
    });

    if (!authorIdMatched) throw new UnauthorizedException();

    const result = await this.prisma.task.delete({
      where: {
        id: taskId,
        authorId: userId,
      },
    });

    return !!result;
  }
}