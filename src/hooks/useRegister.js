import { useMutation } from 'react-query';
import axios from 'axios';

const handleRegister = async (credentials) => {
  return await axios.post('https://ufiolkow-oms.herokuapp.com/auth/local/register', credentials, { withCredentials: true });
};

export const useRegister = () => {
  return useMutation(handleRegister);
};
