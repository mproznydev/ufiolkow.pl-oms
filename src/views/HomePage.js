import React from 'react';
import styled from 'styled-components';
import Kanban from 'components/organisms/Kanban/Kanban';
import News from 'components/organisms/News/News';
import Messages from 'components/organisms/Messages/Messages';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  grid-template-rows: 1fr 1fr;
  grid-gap: 1.5rem;
  max-height: calc(100vh - 60px);
  padding: 1rem 0 0rem 1rem;
  overflow-x: hidden;
  @media (max-width: 1330px) {
    grid-template-columns: 1fr;
  }
`;
const StyledKanban = styled(Kanban)`
  grid-row: 1/2;
  grid-column: 1/2;
  max-width: 800px;
  align-self: center;
  justify-self: center;
  max-height: 45vh;
`;
const StyledNews = styled(News)`
  position: absolute;
  top: 0;
  @media (max-width: 1330px) {
    display: none;
  }
`;
const StyledMessages = styled(Messages)`
  grid-row: 2/3;
  grid-column: 1/2;
  max-height: 41vh;
`;
const HomePage = () => {
  return (
    <Wrapper>
      <StyledKanban></StyledKanban>
      <StyledNews></StyledNews>
      <StyledMessages></StyledMessages>
    </Wrapper>
  );
};

HomePage.propTypes = {};

export default HomePage;
