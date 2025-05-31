"use server";

import { print } from "graphql";
import { authFetchGraphQL, fetchGraphQL } from "../fetchGraphQL";
import {
  CREATE_TASK_MUTATION,
  DELETE_TASK_MUTATION,
  GET_TASK_BY_ID,
  GET_TASKS,
  GET_USER_TASKS,
  UPDATE_TASK_MUTATION,
} from "../gqlQueries";
import { transformTakeSkip } from "../helpers";
import { Task } from "../types/modelTypes";
import { TaskFormState } from "../types/formState";
import { TaskFormSchema } from "../zodSchemas/taskFormSchema";
import { uploadThumbnail } from "../upload";

export const fetchTasks = async ({
  page,
  pageSize,
}: {
  page?: number;
  pageSize?: number;
}) => {
  const { skip, take } = transformTakeSkip({ page, pageSize });
  const data = await fetchGraphQL(print(GET_TASKS), { skip, take });

  return { tasks: data.tasks as Task[], totaltasks: data.taskCount };
};

export const fetchTaskById = async (id: number) => {
  const data = await fetchGraphQL(print(GET_TASK_BY_ID), { id });

  return data.getTaskById as Task;
};

export async function fetchUserTasks({
  page,
  pageSize,
}: {
  page?: number;
  pageSize: number;
}) {
  const { take, skip } = transformTakeSkip({ page, pageSize });
  const data = await authFetchGraphQL(print(GET_USER_TASKS), {
    take,
    skip,
  });

  return {
    tasks: data.getUserTasks as Task[],
    totalTasks: data.userTaskCount as number,
  };
}

export async function saveNewTask(
  state: TaskFormState,
  formData: FormData
): Promise<TaskFormState> {
  const validatedFields = TaskFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };
  let thumbnailUrl = "";
  // Todo:Upload Thumbnail to supabase
  if (validatedFields.data.thumbnail)
    thumbnailUrl = await uploadThumbnail(validatedFields.data.thumbnail);

  // Todo: call garphql api

  const data = await authFetchGraphQL(print(CREATE_TASK_MUTATION), {
    input: {
      ...validatedFields.data,
      thumbnail: thumbnailUrl,
    },
  });

  if (data) return { message: "Success! New Task Saved", ok: true };
  return {
    message: "Oops, Something Went Wrong",
    data: Object.fromEntries(formData.entries()),
  };
}

export async function updateTask(
  state: TaskFormState,
  formData: FormData
): Promise<TaskFormState> {
  const validatedFields = TaskFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };

  // Todo: check if thumbnail has been changed
  const { thumbnail, ...inputs } = validatedFields.data;

  let thumbnailUrl = "";
  // Todo:Upload Thumbnail to supabase
  if (thumbnail) thumbnailUrl = await uploadThumbnail(thumbnail);

  const data = await authFetchGraphQL(print(UPDATE_TASK_MUTATION), {
    input: {
      ...inputs,
      ...(thumbnailUrl && { thumbnail: thumbnailUrl }),
    },
  });

  if (data) return { message: "Success! The Task Updated", ok: true };
  return {
    message: "Oops, Something Went Wrong",
    data: Object.fromEntries(formData.entries()),
  };
}

export async function deleteTask(taskId: number) {
  const data = await authFetchGraphQL(print(DELETE_TASK_MUTATION), {
    taskId,
  });

  return data.deleteTask;
}