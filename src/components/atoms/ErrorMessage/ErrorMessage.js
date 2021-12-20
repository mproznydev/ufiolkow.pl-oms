import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize.l};
  text-align: center;
  padding: 4rem 2rem;
`;

const ErrorMessage = () => {
  return (
    <>
      <ErrorText>Sorry but there is no data...</ErrorText>
    </>
  );
};

ErrorMessage.propTypes = {};

export default ErrorMessage;
