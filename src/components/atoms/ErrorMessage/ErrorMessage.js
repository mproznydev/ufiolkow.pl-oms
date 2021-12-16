import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.black};
  font-weight: 500;
`;

const ErrorMessage = () => {
  return (
    <>
      <ErrorText>Sorry but there is an error...</ErrorText>
    </>
  );
};

ErrorMessage.propTypes = {};

export default ErrorMessage;
