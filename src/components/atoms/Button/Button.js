import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.darkPurple};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 19px;
  border: none;
  cursor: pointer;
  font-weight: ${({ isSecondary }) => (isSecondary ? '500' : '600')};
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 7px;
  font-size: 14px;
  width: 7rem;
  margin: 1rem;
  height: 1.8rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.04);
  }
`;
