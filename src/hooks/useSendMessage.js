import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const handleSendMessage = async (message) => {
  try {
    return await axios.post(`http://localhost:1337/messages`, { ...message }, { withCredentials: true });
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
