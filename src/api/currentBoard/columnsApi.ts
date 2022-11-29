import { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

import API from 'api/base';

import { ColumnResponseInterface } from 'api/currentBoard/index.types';

const createColumn = async (boardId: string, title: string) => {
  try {
    const response = (await API.post(`/boards/${boardId}/columns`, { title })) as AxiosResponse;

    if (response.status === 404) {
      toast.error(response.data.message);
      return null;
    }

    toast.success('Column is created');
    return response.data as ColumnResponseInterface;
  } catch {
    toast.error('Failed to create column');
    return null;
  }
};

const updateColumn = async (boardId: string, columnId: string, title: string, order: number) => {
  try {
    const response = (await API.put(`/boards/${boardId}/columns/${columnId}1`, { title, order })) as AxiosResponse;

    if (response.status === 404) {
      toast.error(response.data.message);
      return null;
    }

    toast.success('Column is updated');
    return response.data as ColumnResponseInterface;
  } catch {
    toast.error('Failed to update column');
    return null;
  }
};

const removeColumn = async (boardId: string, columnId: string) => {
  try {
    const response = (await API.delete(`/boards/${boardId}/columns/${columnId}`)) as AxiosResponse;

    if (response.status === 404) {
      toast.error(response.data.message);
      return null;
    }

    if (response.status === 204) {
      toast.success('Column is removed');
      return response;
    }

    return null;
  } catch {
    toast.error('Failed to remove column');
    return null;
  }
};

export { createColumn, updateColumn, removeColumn };
