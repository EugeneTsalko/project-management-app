import { AxiosResponse } from 'axios';

import { ColumnResponseInterface } from 'api/currentBoard/index.types';

import API from 'api/base';

const removeColumn = async (boardId: string, columnId: string) => {
  (await API.delete(`/boards/${boardId}/columns/${columnId}`)) as AxiosResponse;
};

const createColumn = async (boardId: string, title: string) => {
  const response = (await API.post(`/boards/${boardId}/columns`, { title })) as AxiosResponse;
  return response.data as ColumnResponseInterface;
};

const updateColumn = async (boardId: string, columnId: string, title: string, order: number) => {
  const response = (await API.put(`/boards/${boardId}/columns/${columnId}`, { title, order })) as AxiosResponse;
  return response.data as ColumnResponseInterface;
};

export { removeColumn, createColumn, updateColumn };
