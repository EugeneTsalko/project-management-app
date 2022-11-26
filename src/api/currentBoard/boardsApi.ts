import { AxiosResponse } from 'axios';
import { BoardInterface } from 'api/currentBoard/index.types';

import API from 'api/base';

const getBoard = async (id: string) => {
  const response = (await API.get(`/boards/${id}`)) as AxiosResponse;
  return response.data as BoardInterface;
};

export { getBoard };
