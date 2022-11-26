import { AxiosResponse } from 'axios';

import API from 'api/base';

import { ColumnResponseInterface } from 'api/currentBoard/index.types';

const createColumn = async (boardId: string, title: string) => {
  const response = (await API.post(`/boards/${boardId}/columns`, { title })) as AxiosResponse;
  return response.data as ColumnResponseInterface;
};

const updateColumn = async (boardId: string, columnId: string, title: string, order: number) => {
  const response = (await API.put(`/boards/${boardId}/columns/${columnId}`, { title, order })) as AxiosResponse;
  return response.data as ColumnResponseInterface;
};

const removeColumn = async (boardId: string, columnId: string) => {
  const response = (await API.delete(`/boards/${boardId}/columns/${columnId}`)) as AxiosResponse;
  return response;
};

export { createColumn, updateColumn, removeColumn };
