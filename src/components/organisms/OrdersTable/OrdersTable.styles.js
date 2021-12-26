import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ViewWrapper from 'components/atoms/ViewWrapper/ViewWrapper';

export const LoadingWrapper = styled.div`
  text-align: center;
  padding: 4rem 2rem;
`;

export const StyledViewWrapper = styled(ViewWrapper)`
  min-height: 400px;
`;

export const Wrapper = styled.div`
  margin: 2rem;
`;
export const TableBody = styled.tbody``;
export const TableHead = styled.thead``;
export const OrderRow = styled.tr`
  cursor: pointer;
  td {
    border-bottom: 1px dashed black;
  }
`;

export const TableWrapper = styled.table`
  padding: 2rem 0 2rem 0;
  width: 100%;

  td {
    text-align: center;
    font-weight: 500;
  }
`;
export const TableTitle = styled.th`
  text-align: center;

  border-bottom: 1px dashed black;
  margin: 1rem;
  font-size: ${({ theme }) => theme.fontSize.l}; ;
`;

export const StyledLink = styled(Link)`
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.darkPurple};
  padding-top: 3px;
  padding-bottom: 3px;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 19px;
  border: none;
  cursor: pointer;
  font-weight: ${({ isSecondary }) => (isSecondary ? '500' : '600')};
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 7px;
  font-size: 14px;
  width: 7rem;
  height: 2.5rem;
  transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(1.04);
  }
`;

export const ModalWrapper = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const CreateNewOrderWrapper = styled.div`
  display: flex;

  justify-content: center;
  align-self: center;
  padding: 0.5rem;
`;
