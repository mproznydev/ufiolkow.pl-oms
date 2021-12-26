import React, { useState } from 'react';
import styled from 'styled-components';
import Checkbox from 'components/atoms/Checkbox/Checkbox';
import { Button } from 'components/atoms/Button/Button';
import FormField from 'components/molecules/UnauthenticatedFormField/UnauthenticatedFormField';
import UnauthenticatedDashboard from 'components/templates/UnauthenticatedLayout/UnauthenticatedLayout';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useCurrentDispatchUser } from 'contexts/CurrentUserProvider';

const ButtonWithCheckboxWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const dispatch = useCurrentDispatchUser();
  const [userData, setUserData] = useState({
    identifier: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post('https://ufiolkow-oms.herokuapp.com/auth/local', userData, {
          withCredentials: true,
        })
        .then((res) => {
          dispatch({ type: 'LOGIN', user: res.data.user });
          if (res.status === 200) {
            navigate('/');
          }
        });
    } catch (e) {
      if (e.response.data.message[0].messages[0].message) {
        setError(e.response.data.message[0].messages[0].message);
      } else {
        setError('there is problem with login or password');
      }
    }
  };

  return (
    <UnauthenticatedDashboard onSubmit={handleLogin} isLogin>
      <FormField type="email" name="identifier" id="email" label="email" placeholder="login" onChange={handleInputChange}></FormField>
      <FormField type="password" name="password" id="password" label="password" placeholder="password" onChange={handleInputChange}></FormField>
      <ButtonWithCheckboxWrapper>
        <Button type="submit">Login</Button>
        <Checkbox id="remeber-me" name="remeber-me" label="Remember me"></Checkbox>
      </ButtonWithCheckboxWrapper>
      {error ? <p>{error}</p> : null}
    </UnauthenticatedDashboard>
  );
};

Login.propTypes = {};

export default Login;
