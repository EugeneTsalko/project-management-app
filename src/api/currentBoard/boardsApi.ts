import { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

import API from 'api/base';

import { BoardInterface } from 'api/currentBoard/index.types';

const getBoard = async (id: string) => {
  try {
    const response = (await API.get(`/boards/${id}`)) as AxiosResponse;

    if (response.status === 404) {
      toast.error(response.data.message);
      return null;
    }

    return response.data as BoardInterface;
  } catch (err) {
    toast.error((err as Error).message);
    return null;
  }
};

export { getBoard };
