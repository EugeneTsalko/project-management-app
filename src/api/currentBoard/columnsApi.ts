import axios from 'axios';

import { ColumnResponseInterface } from 'api/currentBoard/index.types';

const apiURL = 'https://boiling-lake-31774.herokuapp.com';

const removeColumn = async (boardId: string, columnId: string, token: string) => {
  const headers = { Authorization: `Bearer ${token}` };
  await axios.delete(`${apiURL}/boards/${boardId}/columns/${columnId}`, { headers });
};

const createColumn = async (boardId: string, title: string, token: string) => {
  const headers = { Authorization: `Bearer ${token}` };
  const data = {
    title,
  };
  const response = await axios.post(`${apiURL}/boards/${boardId}/columns`, data, { headers });

  return response.data as ColumnResponseInterface;
};

const updateColumn = async (boardId: string, columnId: string, title: string, order: number, token: string) => {
  const headers = { Authorization: `Bearer ${token}` };
  const data = {
    title,
    order,
  };
  const response = await axios.put(`${apiURL}/boards/${boardId}/columns/${columnId}`, data, { headers });

  return response.data as ColumnResponseInterface;
};

export { removeColumn, createColumn, updateColumn };
