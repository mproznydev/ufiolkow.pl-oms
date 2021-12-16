import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useCurrentUser } from 'contexts/CurrentUserProvider';
import styled from 'styled-components';
import Navigation from 'components/organisms/Navigation/Navigation';
import LoggedAs from 'components/organisms/LoggedAs/LoggedAs';
import SearchBar from 'components/organisms/SearchBar/SearchBar';
import { OrdersProvider } from 'contexts/OrdersProvider';
import { ReactComponent as LogoIcon } from 'assets/images/logo-white.svg';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 60px 1fr;
  height: 100vh;
`;
const StyledLogoIcon = styled(LogoIcon)`
  width: 200px;
  height: 200px;
`;

const IsLoadingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
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
        </IsLoadingWrapper>
      ) : (
        <Wrapper>
          <OrdersProvider>
            <Navigation></Navigation>
            <SearchAreaWrapper>
              <LoggedAs></LoggedAs>
              <StyledSearchBar></StyledSearchBar>
            </SearchAreaWrapper>
            <Outlet></Outlet>
          </OrdersProvider>
        </Wrapper>
      )}
    </>
  );
};

export default AuthenticatedApp;
