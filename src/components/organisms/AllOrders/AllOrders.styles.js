import styled from 'styled-components';
import ViewWrapper from 'components/atoms/ViewWrapper/ViewWrapper';
import { ElementWrapper } from 'components/atoms/ElementWrapper/ElementWrapper';

export const StyledViewWrapper = styled(ViewWrapper)`
  grid-column: 2/3;
  grid-row: 2/3;
  margin: 3rem;
  justify-self: center;
  max-width: 600px;
  min-width: 400px;
`;
export const ListOfOrders = styled.ul`
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;
export const Order = styled.li`
  list-style: none;
  width: 100%;
  color: ${({ theme }) => theme.colors.black};
`;
export const StyledElementWrapper = styled(ElementWrapper)`
  cursor: pointer;
  margin: 0.7rem;
`;
