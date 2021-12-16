import { useQuery } from 'react-query';
import axios from 'axios';

const findClient = async () => {
  try {
    const resp = await axios.get(`http://localhost:1337/clients/`, { withCredentials: true });
    return resp.data;
  } catch (e) {
    console.log(e);
  }
};

export const useClients = (clientId) => {
  return useQuery('clients', () => findClient());
};
