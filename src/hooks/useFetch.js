import { useQuery } from 'react-query';
import axios from 'axios';

const fetchOrders = async (endpoint) => {
  try {
    const resp = await axios.get(`https://ufiolkow-oms.herokuapp.com/${endpoint}`, { withCredentials: true });
    return resp.data;
  } catch (e) {
    console.log(e);
  }
};

export const useFetch = (endpoint) => {
  return useQuery(`${endpoint}`, () => fetchOrders(endpoint));
};
