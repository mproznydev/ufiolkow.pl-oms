import styled from 'styled-components';
import ViewWrapper from 'components/atoms/ViewWrapper/ViewWrapper';
import { ElementWrapper } from 'components/atoms/ElementWrapper/ElementWrapper';

export const WritingForm = styled.form`
  margin-top: 5px;
  position: relative;
  margin: 1rem 1rem;
  display: flex;
  justify-items: flex-start;
  overflow: wrap;
`;
export const WritingWrapper = styled(ElementWrapper)`
  border: none;
  font-size: ${({ theme }) => theme.fontSize.m};
  min-width: 100%;
  height: 10vh;
  resize: none;
  word-wrap: break-word;

  &:focus {
    outline: none;
  }
`;

export const SendButton = styled.button`
  position: absolute;
  border: none;
  font-weight: 500;
  cursor: pointer;
  right: 7px;
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.secondary};
  top: 50%;
  transform: translateY(-50%);
`;

export const StyledViewWrapper = styled(ViewWrapper)`
  grid-column: 3/4;
  max-width: 400px;
  max-height: 100%;
  min-height: 100%;
  justify-self: flex-end;
  min-width: 400px;
`;

export const LoadingWrapper = styled.div`
  text-align: center;
`;

export const NewsSectionTitle = styled.h1`
  margin: 0.5rem 0.7rem;
`;

export const StyledElementWrapper = styled(ElementWrapper)`
  margin: 1rem 1rem;
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.m};
  margin: 0.5rem;
`;

export const NewsMessagesArea = styled.div`
  height: 78vh;
  display: flex;
  flex-direction: column;

  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
`;
