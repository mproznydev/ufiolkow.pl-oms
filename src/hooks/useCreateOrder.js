import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const handleCreateOrder = async (order) => {
  try {
    return await axios.post(`https://ufiolkow-oms.herokuapp.com/orders`, { ...order }, { withCredentials: true });
  } catch (e) {}
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient({});
  return useMutation(handleCreateOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries('orders');
    },
  });
};
