import { useQuery } from 'react-query';
import axios from 'axios';

const fetchOrders = async () => {
  try {
    const resp = await axios.get(`https://ufiolkow-oms.herokuapp.com/orders`, { withCredentials: true });
    return resp.data;
  } catch (e) {
    console.log(e);
  }
};

export const useOrders = (endpoint) => {
  return useQuery('orders', () => fetchOrders(endpoint));
};
