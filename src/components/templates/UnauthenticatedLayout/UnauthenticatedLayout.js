import React from 'react';
import styled from 'styled-components';
import { Button } from 'components/atoms/Button/Button';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/images/logo-purple.svg';

const StyledLink = styled(Link)`
  background-color: ${({ theme }) => theme.colors.darkPurple};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 19px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 7px;
  font-size: 14px;
  width: 7rem;
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  height: 1.8rem;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.04);
  }
`;

const StyledLogo = styled(Logo)`
  width: 100px;
  height: 100px;
`;

const StyledForm = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 3rem 4rem 4rem 4rem;
`;
const CredentialsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
`;

const ActionButtonsWrapper = styled.div`
  justify-self: flex-end;
  display: flex;
  position: relative;
  justify-content: space-around;
  &:before {
    content: '';
    position: absolute;
    bottom: 60px;
    width: 120%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.darkGrey};
  }
`;

const UnauthenticatedLayout = ({ children, isLogin, onSubmit }) => {
  return (
    <>
      <LogoWrapper>
        <StyledLogo>uFiolkow</StyledLogo>
      </LogoWrapper>
      <StyledForm onSubmit={onSubmit}>
        <CredentialsWrapper>{children}</CredentialsWrapper>
        <ActionButtonsWrapper>
          <Button type="button" isSecondary>
            Help
          </Button>
          <StyledLink to={isLogin ? '/login/register' : '/login'}>{isLogin ? 'Register' : 'Login'}</StyledLink>
        </ActionButtonsWrapper>
      </StyledForm>
    </>
  );
};

UnauthenticatedLayout.propTypes = {};

export default UnauthenticatedLayout;
