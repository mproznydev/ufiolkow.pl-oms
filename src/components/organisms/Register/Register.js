import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'components/atoms/Button/Button';
import FormField from 'components/molecules/UnauthenticatedFormField/UnauthenticatedFormField';
import UnauthenticatedDashboard from 'components/templates/UnauthenticatedLayout/UnauthenticatedLayout';
import { useNavigate } from 'react-router-dom';
import { useRegister } from 'hooks/useRegister';

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
  const { mutate: register, isError, isSuccess } = useRegister();
  const navigate = useNavigate();
  const [credentialValues, setCredentialValues] = useState(initialData);
  const [errorMessage, setErrorMessage] = useState('');
  const handleInputChange = (e) => {
    setCredentialValues({
      ...credentialValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    register(credentialValues);
  };

  useEffect(() => {
    if (isSuccess && isError === false) {
      setCredentialValues(initialData);
      navigate('/login');
    } else if (isError) {
      setErrorMessage('im sorry there is a problem with credentials');
    }
  }, [isSuccess, isError, navigate]);

  return (
    <UnauthenticatedDashboard onSubmit={handleRegister}>
      <FormField
        type="text"
        name="username"
        id="username"
        value={credentialValues.username}
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
        value={credentialValues.email}
        onChange={handleInputChange}
      ></FormField>
      <FormField
        type="password"
        name="password"
        id="password"
        label="password"
        value={credentialValues.password}
        placeholder="password"
        onChange={handleInputChange}
      ></FormField>
      <ButtonWithCheckboxWrapper>
        <Button type="submit">Register</Button>
      </ButtonWithCheckboxWrapper>
      {errorMessage ? <p>{errorMessage}</p> : null}
    </UnauthenticatedDashboard>
  );
};

Register.propTypes = {};

export default Register;
