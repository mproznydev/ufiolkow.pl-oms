import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const handleSaveOrder = async (order) => {
  try {
    return await axios.put(`http://localhost:1337/orders/${order.id}`, { ...order }, { withCredentials: true });
  } catch (e) {}
};

export const useSaveOrder = () => {
  return useMutation((id, order) => handleSaveOrder(id, order), {
    onSuccess: () => {
      //   queryClient.invalidateQueries('orders');
    },
  });
};
