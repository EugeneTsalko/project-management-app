import { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

import API from 'api/base';

import { TaskResponseInterface } from 'api/currentBoard/index.types';

const createTask = async (boardId: string, columnId: string, title: string, description: string, userId: string) => {
  try {
    const response = (await API.post(`/boards/${boardId}/columns/${columnId}/tasks`, {
      title,
      description,
      userId,
    })) as AxiosResponse;

    if (response.status === 404) {
      toast.error(response.data.message);
      return null;
    }

    toast.success('Task is created');
    return response.data as TaskResponseInterface;
  } catch {
    toast.error('Failed to create task');
    return null;
  }
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
  try {
    const response = (await API.put(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
      title,
      description,
      order,
      boardId,
      columnId,
      userId,
    })) as AxiosResponse;

    if (response.status === 404) {
      toast.error(response.data.message);
      return null;
    }

    toast.success('Task is updated');
    return response.data as TaskResponseInterface;
  } catch {
    toast.error('Failed to update task');
    return null;
  }
};

const removeTask = async (boardId: string, columnId: string, taskId: string) => {
  try {
    const response = (await API.delete(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}1`)) as AxiosResponse;

    if (response.status === 404) {
      toast.error(response.data.message);
      return null;
    }

    if (response.status === 204) {
      toast.success('Task is removed');
      return response;
    }

    return null;
  } catch {
    toast.error('Failed to remove task');
    return null;
  }
};

export { createTask, updateTask, removeTask };
