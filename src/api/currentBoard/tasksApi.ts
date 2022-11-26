import axios from 'axios';

import { TaskResponseInterface } from 'api/currentBoard/index.types';

const apiURL = 'https://boiling-lake-31774.herokuapp.com';

const createTask = async (
  boardId: string,
  columnId: string,
  title: string,
  description: string,
  userId: string,
  token: string
) => {
  const headers = { Authorization: `Bearer ${token}` };
  const data = {
    title,
    description,
    userId,
  };
  const response = await axios.post(`${apiURL}/boards/${boardId}/columns/${columnId}/tasks`, data, { headers });

  return response.data as TaskResponseInterface;
};

const updateTask = async (
  boardId: string,
  columnId: string,
  taskId: string,
  title: string,
  description: string,
  order: number,
  userId: string,
  token: string
) => {
  const headers = { Authorization: `Bearer ${token}` };
  const data = {
    title,
    description,
    order,
    boardId,
    columnId,
    userId,
  };
  const response = await axios.put(`${apiURL}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, data, {
    headers,
  });

  return response.data as TaskResponseInterface;
};

const removeTask = async (boardId: string, columnId: string, taskId: string, token: string) => {
  const headers = { Authorization: `Bearer ${token}` };
  await axios.delete(`${apiURL}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, { headers });
};

export { createTask, updateTask, removeTask };
