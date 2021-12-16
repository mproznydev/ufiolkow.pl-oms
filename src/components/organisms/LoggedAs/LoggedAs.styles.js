import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Text = styled.p`
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize.l};
  span {
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.m};
  }
`;
