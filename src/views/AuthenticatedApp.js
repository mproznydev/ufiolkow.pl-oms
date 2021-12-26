import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useCurrentUser } from 'contexts/CurrentUserProvider';
import styled from 'styled-components';
import Navigation from 'components/organisms/Navigation/Navigation';
import LoggedAs from 'components/organisms/LoggedAs/LoggedAs';
import SearchBar from 'components/organisms/SearchBar/SearchBar';
import { ReactComponent as LogoIcon } from 'assets/images/logo-white.svg';
import LoadingSpinner from 'components/atoms/LoadingSpinner/LoadingSpinner';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 60px 1fr;
  height: 100vh;
`;
const StyledLogoIcon = styled(LogoIcon)`
  width: 200px;
  height: 200px;
  margin-bottom: 5rem;
`;

const IsLoadingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SearchAreaWrapper = styled.div`
  display: flex;
  grid-column: 2/3;
  grid-row: 1/2;
  justify-content: flex-start;
  max-width: 380px;
  padding-left: 10px;
`;
const StyledSearchBar = styled(SearchBar)`
  margin-left: 15px;
`;

const AuthenticatedApp = () => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (!currentUser.isAuthenticated && !currentUser.isLoading) {
      navigate('/login');
    }
  }, [currentUser.isAuthenticated, currentUser.isLoading, navigate]);

  return (
    <>
      {currentUser.isLoading ? (
        <IsLoadingWrapper>
          <StyledLogoIcon></StyledLogoIcon>
          <LoadingSpinner></LoadingSpinner>
        </IsLoadingWrapper>
      ) : (
        <Wrapper>
          <Navigation></Navigation>
          <SearchAreaWrapper>
            <LoggedAs></LoggedAs>
            <StyledSearchBar></StyledSearchBar>
          </SearchAreaWrapper>
          <Outlet></Outlet>
        </Wrapper>
      )}
    </>
  );
};

export default AuthenticatedApp;
