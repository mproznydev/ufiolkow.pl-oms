import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/images/logo-white.svg';

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.darkPurple};
  height: 100%;
  width: 100%;
  border-radius: 0px 10px 10px 0;
  box-shadow: 0 5px 15px 5px rgba(0, 0, 0, 0.3);
  grid-row: 1/3;
  grid-column: 1/2;
`;

export const SubNavWrapper = styled.div`
  position: absolute;
  top: 10%;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 1rem 1rem 1.5rem;
  width: 150px;
  height: 80%;
  border-radius: 15px;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.secondary};
  transform: translateX(88px);
  transition: all 0.2s ease-in-out;
  visibility: hidden;
  filter: opacity(0);
`;
export const ListElWrapper = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  background-color: transparent;
  border: 1px solid transparent;
  position: relative;
  svg {
    width: 60px;
    height: 40px;
  }
  &:hover {
    ${SubNavWrapper} {
      visibility: visible;
      filter: opacity(100);
    }
  }
  &.active {
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 15px;
    box-shadow: ${({ theme }) => theme.shadow.primary};
  }
`;

export const List = styled.ul`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const NavigationWrapper = styled.nav`
  height: 100vh;
  padding: 1rem 0 1rem 0;
`;

export const SubNav = styled(NavLink)`
  color: ${({ theme }) => theme.colors.white};
  position: relative;
  text-decoration: none;
`;

export const LogoStyled = styled(Logo)`
  width: 70px;
  height: 70px;
  fill: white;
`;

export const ListEl = styled.li`
  list-style: none;
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.white};
`;

export const MiddleNavWrapper = styled.div`
  ${ListElWrapper} {
    padding: 2rem 0.5rem 2rem 0.5rem;
  }
`;
