import { useQuery } from 'react-query';
import axios from 'axios';

const fetchClient = async (id) => {
  try {
    const resp = await axios.get(`https://ufiolkow-oms.herokuapp.com/clients/${id}`, { withCredentials: true });
    return resp.data;
  } catch (e) {
    console.log(e);
  }
};

export const useClient = (clientId) => {
  return useQuery(['clients', clientId], () => fetchClient(clientId));
};
