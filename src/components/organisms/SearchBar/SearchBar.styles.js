import styled from 'styled-components';

export const SearchWrapper = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  position: relative;
`;

export const SearchResultsWrapper = styled.ul`
  position: absolute;
  top: 45px;
  border-radius: 5px;
  left: 0px;
  z-index: 1000;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

export const Input = styled.input`
  border-radius: 10px;
  width: 220px;
  height: 28px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  border: none;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  color: ${({ theme }) => theme.colors.black};

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.black};
    padding-left: 4px;
    filter: opacity(68%);
    font-size: ${({ theme }) => theme.fontSize.m};
  }
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }
`;

export const SearchResult = styled.li`
  list-style: none;
  font-size: ${({ theme }) => theme.fontSize.s};
  margin-bottom: 5px;
  margin-top: 5px;
  font-weight: 500;
  cursor: pointer;
`;
