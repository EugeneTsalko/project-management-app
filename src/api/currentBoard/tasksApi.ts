import { AxiosResponse } from 'axios';

import API from 'api/base';

import { TaskResponseInterface } from 'api/currentBoard/index.types';

const createTask = async (boardId: string, columnId: string, title: string, description: string, userId: string) => {
  const response = (await API.post(`/boards/${boardId}/columns/${columnId}/tasks`, {
    title,
    description,
    userId,
  })) as AxiosResponse;

  return response.data as TaskResponseInterface;
};

const updateTask = async (
  boardId: string,
  columnId: string,
  taskId: string,
  title: string,
  description: string,
  order: number,
  userId: string
) => {
  const response = (await API.put(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
    title,
    description,
    order,
    boardId,
    columnId,
    userId,
  })) as AxiosResponse;

  return response.data as TaskResponseInterface;
};

const removeTask = async (boardId: string, columnId: string, taskId: string) => {
  const response = (await API.delete(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`)) as AxiosResponse;
  return response;
};

export { createTask, updateTask, removeTask };
