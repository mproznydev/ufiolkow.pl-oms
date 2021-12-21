import { ElementWrapper } from 'components/atoms/ElementWrapper/ElementWrapper';
import ViewWrapper from 'components/atoms/ViewWrapper/ViewWrapper';
import styled from 'styled-components';

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledViewWrapper = styled(ViewWrapper)`
  display: flex;
  justify-content: center;
  min-height: 320px;
  min-width: 800px;
`;
export const Order = styled.li`
  list-style: none;
  width: 100%;
  color: ${({ theme }) => theme.colors.black};
`;

export const StyledElementWrapper = styled(ElementWrapper)`
  cursor: pointer;
  margin: 0.3rem;
  font-size: ${({ theme }) => theme.fontSize.m};
`;

export const UnOrderedList = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

export const KanbanSectionWrapper = styled.div`
  margin: 1rem;
  min-width: 240px;
  min-height: 300px;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadow.primary};

  overflow-y: scroll;
  scrollbar-width: none;
  background-color: ${({ isNew, isInProgress, isDone, theme }) => {
    if (isNew) {
      return theme.colors.kanbanNew;
    }
    if (isInProgress) {
      return theme.colors.kanbanInProgess;
    }
    if (isDone) {
      return theme.colors.kanbanDone;
    }
  }};
  ::-webkit-scrollbar {
    display: none;
  }
  & p {
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.l};
    font-weight: 600;
    margin: 5px 0 5px 0;
  }
`;
