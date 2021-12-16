import styled from 'styled-components';

export const ElementWrapper = styled.div`
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: 500;
`;
