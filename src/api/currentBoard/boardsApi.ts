import axios from 'axios';
import { BoardInterface } from 'api/currentBoard/index.types';

const apiURL = 'https://boiling-lake-31774.herokuapp.com';

const getBoard = async (id: string, token: string) => {
  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.get(`${apiURL}/boards/${id}`, { headers });

  return response.data as BoardInterface;
};

export { getBoard };
