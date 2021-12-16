import React from 'react';
import { ReactComponent as HomeIcon } from 'assets/images/home-icon.svg';
import { ReactComponent as OrdersIcon } from 'assets/images/orders-icon.svg';
import { ReactComponent as ClinetsIcon } from 'assets/images/clients-icon.svg';
import { ReactComponent as LogoutIcon } from 'assets/images/logout-icon.svg';
import { ReactComponent as MessagesIcon } from 'assets/images/messages-icon.svg';
import { Wrapper, NavigationWrapper, List, LogoStyled, MiddleNavWrapper, ListElWrapper, ListEl, SubNavWrapper, SubNav } from './Navigation.styles';
import axios from 'axios';
import { useCurrentDispatchUser } from 'contexts/CurrentUserProvider';

function Navigation() {
  const dispatch = useCurrentDispatchUser();

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:1337/logout',
        {},
        {
          withCredentials: true,
        }
      );
      dispatch({ type: 'LOGOUT' });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Wrapper>
      <NavigationWrapper>
        <List>
          <LogoStyled></LogoStyled>
          <MiddleNavWrapper>
            <ListElWrapper to="/">
              <HomeIcon />
              <ListEl>Home</ListEl>
            </ListElWrapper>
            <ListElWrapper to="/orders">
              <OrdersIcon />
              <ListEl>Orders</ListEl>
              <SubNavWrapper>
                <SubNav to="/orders">All orders</SubNav>
                <SubNav to="/orders/new">Create order</SubNav>
                <SubNav to="/orders/kanban">Kanban</SubNav>
              </SubNavWrapper>
            </ListElWrapper>
            <ListElWrapper to="/messages">
              <MessagesIcon />
              <ListEl>Messages</ListEl>
              <SubNavWrapper>
                <SubNav to="/messages">All messages</SubNav>
              </SubNavWrapper>
            </ListElWrapper>
            <ListElWrapper to="/clients">
              <ClinetsIcon />
              <ListEl>Clinets</ListEl>
              <SubNavWrapper>
                <SubNav to="/client">All clients</SubNav>
              </SubNavWrapper>
            </ListElWrapper>
          </MiddleNavWrapper>
          <ListElWrapper as="button" onClick={handleLogout}>
            <LogoutIcon />
            <ListEl>Log out</ListEl>
          </ListElWrapper>
        </List>
      </NavigationWrapper>
    </Wrapper>
  );
}

export default Navigation;
