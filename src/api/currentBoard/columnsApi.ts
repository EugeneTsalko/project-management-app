import { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

import API from 'api/base';

import { ColumnInterface } from 'api/currentBoard/index.types';

const getColumns = async (boardId: string) => {
  try {
    const response = (await API.get(`/boards/${boardId}/columns`)) as AxiosResponse;

    if (response.status === 404) {
      toast.error(response.data.message);
      return null;
    }

    return response.data as ColumnInterface[];
  } catch (err) {
    toast.error((err as Error).message);
    return null;
  }
};

const createColumn = async (boardId: string, title: string, order: number) => {
  try {
    const response = (await API.post(`/boards/${boardId}/columns`, { title, order })) as AxiosResponse;

    if (response.status === 404) {
      toast.error(response.data.message);
      return null;
    }

    return response.data as ColumnInterface;
  } catch (err) {
    toast.error((err as Error).message);
    return null;
  }
};

const updateColumn = async (boardId: string, columnId: string, title: string, order: number) => {
  try {
    const response = (await API.put(`/boards/${boardId}/columns/${columnId}`, { title, order })) as AxiosResponse;

    if (response.status === 404) {
      toast.error(response.data.message);
      return null;
    }

    return response.data as ColumnInterface;
  } catch (err) {
    toast.error((err as Error).message);
    return null;
  }
};

const removeColumn = async (boardId: string, columnId: string) => {
  try {
    const response = (await API.delete(`/boards/${boardId}/columns/${columnId}`)) as AxiosResponse;

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

export { getColumns, createColumn, updateColumn, removeColumn };
