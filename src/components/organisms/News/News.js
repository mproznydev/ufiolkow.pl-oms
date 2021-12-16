import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ViewWrapper from 'components/atoms/ViewWrapper/ViewWrapper';
import { ElementWrapper } from 'components/atoms/ElementWrapper/ElementWrapper';
import { useFetch } from 'hooks/useFetch';
import LoadingSpinner from 'components/atoms/LoadingSpinner/LoadingSpinner';

const StyledViewWrapper = styled(ViewWrapper)`
  grid-column: 3/4;
  max-width: 400px;
  max-height: 100%;
  justify-self: flex-end;
  overflow-y: scroll;
`;
const NewsSectionTitle = styled.h1`
  margin: 0.5rem 0.7rem;
`;

const StyledElementWrapper = styled(ElementWrapper)`
  margin: 2rem 1rem;
`;
const Title = styled.h2`
  margin: 0.5rem;
  font-size: ${({ theme }) => theme.fontSize.l}; ;
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.m};
  margin: 0.5rem;
`;

function News({ className }) {
  const { data: news, status } = useFetch('news');
  return (
    <StyledViewWrapper className={className}>
      <NewsSectionTitle>News</NewsSectionTitle>
      {news && news.length > 0 ? (
        news.map((article) => (
          <StyledElementWrapper key={article.title}>
            <Title>{article.title}</Title>
            <Description>{article.description}</Description>
          </StyledElementWrapper>
        ))
      ) : (
        <StyledElementWrapper>
          <Title>
            <LoadingSpinner></LoadingSpinner>
          </Title>
          <Description></Description>
        </StyledElementWrapper>
      )}
    </StyledViewWrapper>
  );
}

export default News;
