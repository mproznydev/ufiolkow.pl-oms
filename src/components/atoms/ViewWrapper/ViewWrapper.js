import React from 'react';
import styled from 'styled-components';
const Wrapper = styled.div`
  border-radius: 19px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  box-shadow: ${({ theme }) => theme.shadow.primary};
  position: relative;
`;

const Title = styled.p`
  position: absolute;
  top: -15px;
  left: 50%;
  white-space: nowrap;
  transform: translate(-50%, 0);
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize.xl}; ;
`;

const ViewWrapper = React.forwardRef(({ title, className, children }, ref) => (
  <Wrapper ref={ref} className={className}>
    <Title>{title}</Title>
    {children}
  </Wrapper>
));

export default ViewWrapper;
