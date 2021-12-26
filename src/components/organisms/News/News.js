import React, { useState } from 'react';
import { useFetch } from 'hooks/useFetch';
import {
  WritingForm,
  WritingWrapper,
  SendButton,
  StyledViewWrapper,
  LoadingWrapper,
  NewsSectionTitle,
  StyledElementWrapper,
  Description,
  NewsMessagesArea,
} from './News.styles';
import LoadingSpinner from 'components/atoms/LoadingSpinner/LoadingSpinner';
import ErrorMessage from 'components/atoms/ErrorMessage/ErrorMessage';
import { useCreateNews } from 'hooks/useCreateNews';

function News({ className }) {
  const { mutate: createNews } = useCreateNews();
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
    createNews(writtenMessage);
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
