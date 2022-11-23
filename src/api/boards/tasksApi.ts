import axios from 'axios';

import { CreateTaskResponseInterface } from 'api/boards';

const apiURL = 'https://boiling-lake-31774.herokuapp.com';

async function createTask(
  boardId: string,
  columnId: string,
  title: string,
  description: string,
  userId: string,
  token: string
) {
  const headers = { Authorization: `Bearer ${token}` };
  const data = {
    title,
    description,
    userId,
  };
  const response = await axios.post(`${apiURL}/boards/${boardId}/columns/${columnId}/tasks`, data, { headers });

  return response.data as CreateTaskResponseInterface;
}

export { createTask };
