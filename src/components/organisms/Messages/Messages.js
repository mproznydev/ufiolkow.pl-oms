import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ViewWrapper from 'components/atoms/ViewWrapper/ViewWrapper';
import { ElementWrapper } from 'components/atoms/ElementWrapper/ElementWrapper';
import { useFetch } from 'hooks/useFetch';
import { useSendMessage } from 'hooks/useSendMessage';
const StyledViewWrapper = styled(ViewWrapper)`
  display: flex;
  justify-self: center;
  width: 100%;
  padding: 1rem;
  max-height: calc(100vh - 60px);
  max-width: 900px;
`;

const WritingWrapper = styled(ElementWrapper)`
  border: none;
  font-size: ${({ theme }) => theme.fontSize.m};
  width: 100%;
  height: 100%;
  &:focus {
    outline: none;
  }
`;

const ClientName = styled.p`
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  width: 90%;
  text-align: center;
  margin-top: 8px;
  font-weight: ${({ isUsed }) => (isUsed ? '600' : '400')};

  &:hover {
    cursor: pointer;
  }
`;

const MessagesWithWritingWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
`;

const ContactsWrapper = styled(ElementWrapper)`
  width: 200px;
  margin-right: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;
const MessagesWrapper = styled(ElementWrapper)`
  width: 100%;
  height: 90%;
  max-height: 90%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
const WritingForm = styled.form`
  height: 10%;
  margin-top: 5px;
  position: relative;
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

const Sender = styled.p`
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: 600;
`;
const Context = styled.p`
  font-size: ${({ theme }) => theme.fontSize.m};
`;

const Messages = ({ className }) => {
  const { data: messages } = useFetch('messages');
  const [writtenMessage, setWrittenMessage] = useState('');
  const { mutate: sendMessage, status: messageStatus } = useSendMessage();
  const scrollToFirstMessRef = useRef();
  const writingWrapperRef = useRef();
  const [clients, setClients] = useState();
  const [currentClient, setCurrentClient] = useState('');

  const MessageChange = (e) => {
    setWrittenMessage(e.target.value);
  };

  useEffect(() => {
    if (messages && messages.length > 0) {
      const AllRepeatedClients = messages.map((message) => {
        return message.client;
      });
      const uniqueClients = [...new Set(AllRepeatedClients)];
      setClients(uniqueClients);
    }
  }, [messages]);

  useEffect(() => {
    if (scrollToFirstMessRef && scrollToFirstMessRef.current) {
      scrollToFirstMessRef.current.scrollIntoView();
    }
  }, [currentClient]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const messageData = { message: writtenMessage, client: currentClient, sender: 'boss' };
    sendMessage(messageData);
    setWrittenMessage('');
    writingWrapperRef.current.focus();
  };

  return (
    <StyledViewWrapper className={className} title="Messages">
      <ContactsWrapper>
        {clients
          ? clients.map((client, id) => (
              <ClientName key={id} onClick={() => setCurrentClient(client)} isUsed={client === currentClient}>
                {client}
              </ClientName>
            ))
          : null}
      </ContactsWrapper>
      <MessagesWithWritingWrapper>
        <MessagesWrapper>
          {messages
            ? messages
                .filter((message) => message.client === currentClient)
                .map((message) => (
                  <div key={message.id}>
                    <Sender>{message.sender}:</Sender>
                    <Context>{message.message}</Context>
                  </div>
                ))
            : null}
          <div ref={scrollToFirstMessRef}></div>
        </MessagesWrapper>
        <WritingForm onSubmit={handleSendMessage}>
          <WritingWrapper
            as="input"
            ref={writingWrapperRef}
            type="text"
            placeholder="Aa"
            value={writtenMessage}
            onChange={MessageChange}
          ></WritingWrapper>
          <SendButton type="submit">{messageStatus === 'loading' ? 'wait' : 'send'}</SendButton>
        </WritingForm>
      </MessagesWithWritingWrapper>
    </StyledViewWrapper>
  );
};

Messages.propTypes = {};

export default Messages;
