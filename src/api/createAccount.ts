import axios from 'axios';

type AuthorizationValues = {
  name?: string;
  login: string;
  password: string;
};

const DOMAIN = 'https://boiling-lake-31774.herokuapp.com';

export async function createAccount(user: AuthorizationValues) {
  try {
    const response = await axios.post(`${DOMAIN}/signup`, user);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
