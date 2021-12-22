import React, { useState, useRef, useEffect } from 'react';
import {
  StyledViewWrapper,
  WritingWrapper,
  ClientName,
  MessagesWithWritingWrapper,
  ContactsWrapper,
  MessagesWrapper,
  WritingForm,
  SendButton,
  Sender,
  Context,
} from './Messages.styles';
import { useFetch } from 'hooks/useFetch';
import { useSendMessage } from 'hooks/useSendMessage';

const Messages = ({ className }) => {
  const { data: messages } = useFetch('messages');
  const [writtenMessage, setWrittenMessage] = useState('');
  const { mutate: sendMessage, status: messageStatus } = useSendMessage();
  const scrollToFirstMessRef = useRef();
  const writingWrapperRef = useRef();
  const [clients, setClients] = useState();
  const [currentClient, setCurrentClient] = useState('');

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

  const MessageChange = (e) => {
    setWrittenMessage(e.target.value);
  };

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
