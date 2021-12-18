import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'components/atoms/Button/Button';
import FormField from 'components/molecules/UnauthenticatedFormField/UnauthenticatedFormField';
import UnauthenticatedDashboard from 'components/templates/UnauthenticatedLayout/UnauthenticatedLayout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initialData = {
  username: '',
  email: '',
  password: '',
};

const ButtonWithCheckboxWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Register = () => {
  let navigate = useNavigate();
  const [formValue, setFormValue] = useState(initialData);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://ufiolkow-oms.herokuapp.com/auth/local/register', formValue).then((res) => {
        if (res.status === 200) {
          setFormValue(initialData);
          navigate('/login');
        }
      });
    } catch (e) {
      setError(e.response.data.message[0].messages[0].message);
    }
  };

  return (
    <UnauthenticatedDashboard onSubmit={handleRegister}>
      <FormField
        type="text"
        name="username"
        id="username"
        value={formValue.username}
        label="user name"
        placeholder="user name"
        onChange={handleInputChange}
      ></FormField>
      <FormField
        type="email"
        id="email"
        name="email"
        label="email"
        placeholder="email"
        value={formValue.email}
        onChange={handleInputChange}
      ></FormField>
      <FormField
        type="password"
        name="password"
        id="password"
        label="password"
        value={formValue.password}
        placeholder="password"
        onChange={handleInputChange}
      ></FormField>
      <ButtonWithCheckboxWrapper>
        <Button type="submit">Register</Button>
      </ButtonWithCheckboxWrapper>
      {error ? <p>{error}</p> : null}
    </UnauthenticatedDashboard>
  );
};

Register.propTypes = {};

export default Register;
