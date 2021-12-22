import styled from 'styled-components';
import ViewWrapper from 'components/atoms/ViewWrapper/ViewWrapper';
import { ElementWrapper } from 'components/atoms/ElementWrapper/ElementWrapper';

export const StyledViewWrapper = styled(ViewWrapper)`
  display: flex;
  justify-self: center;
  width: 100%;
  padding: 1rem;
  max-height: calc(100vh - 60px);
  max-width: 900px;
`;

export const WritingWrapper = styled(ElementWrapper)`
  border: none;
  font-size: ${({ theme }) => theme.fontSize.m};
  width: 100%;
  height: 100%;
  &:focus {
    outline: none;
  }
`;

export const ClientName = styled.p`
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  width: 90%;
  text-align: center;
  margin-top: 8px;
  font-weight: ${({ isUsed }) => (isUsed ? '600' : '400')};

  &:hover {
    cursor: pointer;
  }
`;

export const MessagesWithWritingWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
`;

export const ContactsWrapper = styled(ElementWrapper)`
  width: 200px;
  margin-right: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;
export const MessagesWrapper = styled(ElementWrapper)`
  width: 100%;
  height: 90%;
  max-height: 90%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
export const WritingForm = styled.form`
  height: 10%;
  margin-top: 5px;
  position: relative;
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

export const Sender = styled.p`
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: 600;
`;
export const Context = styled.p`
  font-size: ${({ theme }) => theme.fontSize.m};
`;
