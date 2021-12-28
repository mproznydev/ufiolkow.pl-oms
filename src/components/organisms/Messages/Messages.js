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
  const { data: messages = [] } = useFetch('messages');
  const { mutate: sendMessage, status: messageStatus } = useSendMessage();
  const [writtenMessage, setWrittenMessage] = useState('');
  const latestMessage = useRef();
  const writingWrapperRef = useRef();
  const [senders, setSenders] = useState([]);
  const [currentSender, setCurrentSender] = useState('');

  useEffect(() => {
    if (messages && messages.length > 0) {
      const AllRepeatedSenders = messages.map((message) => {
        return message.client;
      });
      const uniqueSenders = [...new Set(AllRepeatedSenders)];
      setSenders(uniqueSenders);
    }
  }, [messages]);

  useEffect(() => {
    if (latestMessage && latestMessage.current) {
      latestMessage.current.scrollIntoView();
    }
  }, [currentSender]);

  const MessageChange = (e) => {
    setWrittenMessage(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const messageData = { message: writtenMessage, client: currentSender, sender: 'boss' };
    sendMessage(messageData);
    setWrittenMessage('');
    writingWrapperRef.current.focus();
  };

  return (
    <StyledViewWrapper className={className} title="Messages">
      <ContactsWrapper>
        {senders.map((client, id) => (
          <ClientName
            key={id}
            onClick={() => {
              setCurrentSender(client);
              setWrittenMessage('');
            }}
            isUsed={client === currentSender}
          >
            {client}
          </ClientName>
        ))}
      </ContactsWrapper>
      <MessagesWithWritingWrapper>
        <MessagesWrapper>
          {messages
            .filter((message) => message.client === currentSender)
            .map((message) => (
              <div key={message.id}>
                <Sender>{message.sender}:</Sender>
                <Context>{message.message}</Context>
              </div>
            ))}
          <div ref={latestMessage}></div>
        </MessagesWrapper>
        <WritingForm onSubmit={handleSendMessage}>
          <WritingWrapper
            readonly="readonly"
            as="input"
            ref={writingWrapperRef}
            type="text"
            placeholder={currentSender === '' ? 'select conversation' : 'Aa'}
            value={writtenMessage}
            onChange={MessageChange}
          ></WritingWrapper>
          <SendButton type="submit" disabled={currentSender === '' ? true : false}>
            {messageStatus === 'loading' ? 'wait' : 'send'}
          </SendButton>
        </WritingForm>
      </MessagesWithWritingWrapper>
    </StyledViewWrapper>
  );
};

Messages.propTypes = {};

export default Messages;
