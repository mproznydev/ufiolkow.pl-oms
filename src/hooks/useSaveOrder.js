import { useMutation } from 'react-query';
import axios from 'axios';

const handleSaveOrder = async (order) => {
  try {
    return await axios.put(`https://ufiolkow-oms.herokuapp.com/orders/${order.id}`, { ...order }, { withCredentials: true });
  } catch (e) {}
};

export const useSaveOrder = () => {
  return useMutation((id, order) => handleSaveOrder(id, order), {});
};
