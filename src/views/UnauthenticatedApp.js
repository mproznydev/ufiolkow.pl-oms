import React from 'react';
import styled from 'styled-components';
import { UnauthenticatedContentWrapper } from 'components/atoms/UnauthenticatedContentWrapper/UnauthenticatedContentWrapper';
import { Outlet, Navigate } from 'react-router-dom';
import { useCurrentUser } from 'contexts/CurrentUserProvider';

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

const UnauthenticatedApp = () => {
  const currentUser = useCurrentUser();

  return (
    <Wrapper>
      <UnauthenticatedContentWrapper>{!currentUser.isAuthenticated ? <Outlet></Outlet> : <Navigate to="/"></Navigate>}</UnauthenticatedContentWrapper>
    </Wrapper>
  );
};

UnauthenticatedApp.propTypes = {};

export default UnauthenticatedApp;
