import React, { useState } from 'react';
import styled from 'styled-components';
import ViewWrapper from 'components/atoms/ViewWrapper/ViewWrapper';
import { ElementWrapper } from 'components/atoms/ElementWrapper/ElementWrapper';
import { useFetch } from 'hooks/useFetch';
import LoadingSpinner from 'components/atoms/LoadingSpinner/LoadingSpinner';
import ErrorMessage from 'components/atoms/ErrorMessage/ErrorMessage';
import { useCreateNews } from 'hooks/useCreateNews';

const WritingForm = styled.form`
  margin-top: 5px;
  position: relative;
  margin: 1rem 1rem;
  display: flex;
  justify-items: flex-start;
  overflow: wrap;
`;
const WritingWrapper = styled(ElementWrapper)`
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

const SendButton = styled.button`
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

const StyledViewWrapper = styled(ViewWrapper)`
  grid-column: 3/4;
  max-width: 400px;
  max-height: 100%;
  min-height: 100%;
  justify-self: flex-end;
  min-width: 400px;
`;

const LoadingWrapper = styled.div`
  text-align: center;
`;

const NewsSectionTitle = styled.h1`
  margin: 0.5rem 0.7rem;
`;

const StyledElementWrapper = styled(ElementWrapper)`
  margin: 1rem 1rem;
`;
// const Title = styled.h2`
//   margin: 0.5rem;
//   font-size: ${({ theme }) => theme.fontSize.l}; ;
// `;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.m};
  margin: 0.5rem;
`;

const NewsMessagesArea = styled.div`
  height: 78vh;
  display: flex;
  flex-direction: column;

  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
`;

function News({ className }) {
  const { mutate: addNews } = useCreateNews();
  const { data: news = [], status } = useFetch('news');
  const [writtenMessage, setWrittenMessage] = useState({
    title: '',
    description: '',
  });

  const MessageChange = (e) => {
    setWrittenMessage({
      title: 'test',
      description: e.target.value,
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    addNews(writtenMessage);
    setWrittenMessage({
      title: '',
      description: '',
    });
  };

  return (
    <StyledViewWrapper className={className}>
      <NewsSectionTitle>News</NewsSectionTitle>

      <NewsMessagesArea>
        {status === 'success' && !news.length > 0 ? (
          <ErrorMessage></ErrorMessage>
        ) : (
          <>
            {status === 'loading' ? (
              <LoadingWrapper>
                <LoadingSpinner isPurple></LoadingSpinner>
              </LoadingWrapper>
            ) : (
              news.map((article) => (
                <StyledElementWrapper key={article.id}>
                  <Description>{article.description}</Description>
                </StyledElementWrapper>
              ))
            )}
          </>
        )}
      </NewsMessagesArea>

      <WritingForm onSubmit={handleSendMessage}>
        <WritingWrapper as="textarea" placeholder="Aa" value={writtenMessage.description} onChange={MessageChange}></WritingWrapper>
        <SendButton type="submit">send</SendButton>
      </WritingForm>
    </StyledViewWrapper>
  );
}

export default News;
