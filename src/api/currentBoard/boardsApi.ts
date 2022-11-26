import axios from 'axios';
import { BoardInterface } from 'api/currentBoard/index.types';

const apiURL = 'https://boiling-lake-31774.herokuapp.com';

async function getBoard(id: string, token: string) {
  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.get(`${apiURL}/boards/${id}`, { headers });

  return response.data as BoardInterface;
}

export { getBoard };
