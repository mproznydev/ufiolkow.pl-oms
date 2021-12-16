import styled from 'styled-components';

export const UnauthenticatedContentWrapper = styled.div`
  height: 600px;
  width: 430px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;
