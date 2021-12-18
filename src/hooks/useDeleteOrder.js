import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const handleDeleteOrder = async (id) => {
  try {
    return await axios.delete(`https://ufiolkow-oms.herokuapp.com/orders/${id}`, { withCredentials: true });
  } catch (e) {}
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient({});

  return useMutation(handleDeleteOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries('orders');
    },
  });
};
