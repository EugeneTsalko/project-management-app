import axios from 'axios';

type Params = {
  login: string;
  password: string;
};

const DOMAIN = 'https://boiling-lake-31774.herokuapp.com';

export async function createToken(user: Params) {
  try {
    const response = await axios.post(`${DOMAIN}/signin`, user);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
