import { AxiosResponse } from 'axios';

import API from 'api/base';

import { BoardInterface } from 'api/currentBoard/index.types';

const getBoard = async (id: string) => {
  const response = (await API.get(`/boards/${id}`)) as AxiosResponse;
  return response.data as BoardInterface;
};

export { getBoard };
