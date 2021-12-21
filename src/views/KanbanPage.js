import React from 'react';
import styled from 'styled-components';
import Kanban from 'components/organisms/Kanban/Kanban';

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
`;

const StyledKanban = styled(Kanban)`
  max-width: 800px;
  height: 90%;
`;

const KanbanPage = () => {
  return (
    <Wrapper>
      <StyledKanban></StyledKanban>
    </Wrapper>
  );
};

KanbanPage.propTypes = {};

export default KanbanPage;
