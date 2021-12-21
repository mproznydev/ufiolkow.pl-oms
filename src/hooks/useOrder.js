import { useQuery } from 'react-query';
import axios from 'axios';

const fetchOrder = async (id) => {
  try {
    const resp = await axios.get(`https://ufiolkow-oms.herokuapp.com/orders/${id}`, { withCredentials: true });
    return resp.data;
  } catch (e) {
    console.log(e);
  }
};

export const useOrder = (orderId) => {
  return useQuery(['orders', orderId], () => fetchOrder(orderId));
};
