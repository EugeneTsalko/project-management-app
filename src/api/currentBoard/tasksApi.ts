import axios, { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

import API from 'api/base';

import { ColumnInterface, TaskInterface } from 'api/currentBoard/index.types';

const getTasks = async (boardId: string, columnId: string) => {
  try {
    const response = (await API.get(`/boards/${boardId}/columns/${columnId}/tasks`)) as AxiosResponse;

    if (response.status === 404) {
      toast.error(response.data.message);
      return null;
    }

    return response.data as TaskInterface[];
  } catch (err) {
    toast.error((err as Error).message);
    return null;
  }
};

const getAllTasks = async (columns: ColumnInterface[]) => {
  try {
    const response = (await axios.all(
      columns.map((column) => API.get(`/boards/${column.boardId}/columns/${column._id}/tasks`))
    )) as AxiosResponse[];

    const data = {} as { [key: string]: TaskInterface[] };

    columns.forEach((column, index) => {
      data[column._id] = response[index].data;
    });

    return data;
  } catch (err) {
    toast.error((err as Error).message);
    return null;
  }
};

const createTask = async (
  boardId: string,
  columnId: string,
  title: string,
  description: string,
  order: number,
  userId: string
) => {
  try {
    const response = (await API.post(`/boards/${boardId}/columns/${columnId}/tasks`, {
      title,
      description,
      order,
      userId,
      users: [userId],
    })) as AxiosResponse;

    if (response.status === 404) {
      toast.error(response.data.message);
      return null;
    }

    return response.data as TaskInterface;
  } catch (err) {
    toast.error((err as Error).message);
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
      columnId,
      userId,
      users: [userId],
    })) as AxiosResponse;

    if (response.status === 404) {
      toast.error(response.data.message);
      return null;
    }

    return response.data as TaskInterface;
  } catch (err) {
    toast.error((err as Error).message);
    return null;
  }
};

const removeTask = async (boardId: string, columnId: string, taskId: string) => {
  try {
    const response = (await API.delete(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`)) as AxiosResponse;

    switch (response.status) {
      case 404:
        toast.error(response.data.message);
        return null;
      case 200:
        return response;
      default:
        return null;
    }
  } catch (err) {
    toast.error((err as Error).message);
    return null;
  }
};

export { getTasks, getAllTasks, createTask, updateTask, removeTask };
