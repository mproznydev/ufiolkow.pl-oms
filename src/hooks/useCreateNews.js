import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const handleCreateNews = async (news) => {
  try {
    return await axios.post(`https://ufiolkow-oms.herokuapp.com/news`, { ...news }, { withCredentials: true });
  } catch (e) {}
};

export const useCreateNews = () => {
  const queryClient = useQueryClient({});
  return useMutation(handleCreateNews, {
    onSuccess: () => {
      queryClient.invalidateQueries('news');
    },
  });
};
