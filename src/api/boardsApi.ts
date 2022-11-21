import axios from 'axios';
import { Board } from './boardsApi.types';

const apiURL = 'https://boiling-lake-31774.herokuapp.com';

async function getBoard(id: string, token: string) {
  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.get(`${apiURL}/boards/${id}`, { headers });
  const { data }: { data: Board } = response;

  return data;
}

export { getBoard };
