import axios from 'axios';

import { CreateColumnResponseInterface } from 'api/boards';

const apiURL = 'https://boiling-lake-31774.herokuapp.com';

async function removeColumn(boardId: string, columnId: string, token: string) {
  const headers = { Authorization: `Bearer ${token}` };
  await axios.delete(`${apiURL}/boards/${boardId}/columns/${columnId}`, { headers });
}

async function createColumn(boardId: string, title: string, token: string) {
  const headers = { Authorization: `Bearer ${token}` };
  const data = {
    title,
  };
  const response = await axios.post(`${apiURL}/boards/${boardId}/columns`, data, { headers });

  return response.data as CreateColumnResponseInterface;
}

export { removeColumn, createColumn };
