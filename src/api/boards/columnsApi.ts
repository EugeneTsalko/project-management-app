import axios from 'axios';

const apiURL = 'https://boiling-lake-31774.herokuapp.com';

async function deleteColumn(boardId: string, columnId: string, token: string) {
  const headers = { Authorization: `Bearer ${token}` };
  await axios.delete(`${apiURL}/boards/${boardId}/columns/${columnId}`, { headers });
}

export { deleteColumn };
