import API from './base';

export const getUserById = async (id: string) => {
  const { data } = await API.get(`/users/${id}`);

  return data;
};
