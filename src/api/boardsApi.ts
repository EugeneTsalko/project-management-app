import axios from 'axios';
import { Board } from './boardsApi.models';

const apiURL = 'https://boiling-lake-31774.herokuapp.com';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NGNmOTZkMi01OGZjLTRlMGMtOTZkOS05YWM0MjhkNGQ0OTUiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTIwMDMyMTF9.EUlvrrs0Hl7wq1o-vkW5eh710CeNmhTfivk8aYkO43I';

async function getBoard(id: string) {
  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.get(`${apiURL}/boards/${id}`, { headers });
  const { data }: { data: Board } = response;

  return data;
}

export { getBoard };
