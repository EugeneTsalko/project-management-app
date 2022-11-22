import axios from 'axios';
import { BoardInterface } from 'api/boards';

const apiURL = 'https://boiling-lake-31774.herokuapp.com';

async function getBoard(id: string, token: string) {
  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.get(`${apiURL}/boards/${id}`, { headers });
  const { data }: { data: BoardInterface } = response;

  return data;
}

export { getBoard };
