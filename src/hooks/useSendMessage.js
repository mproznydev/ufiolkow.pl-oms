import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const handleSendMessage = async (message) => {
  try {
    return await axios.post(`https://ufiolkow-oms.herokuapp.com/messages`, { ...message }, { withCredentials: true });
  } catch (e) {}
};

export const useSendMessage = () => {
  const queryClient = useQueryClient({});

  return useMutation(handleSendMessage, {
    onSuccess: () => {
      queryClient.invalidateQueries('messages');
    },
  });
};
