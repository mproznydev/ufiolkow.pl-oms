import React from 'react';
import { Wrapper, Text } from './LoggedAs.styles';
import { useCurrentUser } from 'contexts/CurrentUserProvider';

function LoggedAs() {
  const currentUser = useCurrentUser();

  return (
    <Wrapper>
      <Text>
        Logged as:
        <br />
        <span>{currentUser.email}</span>
      </Text>
    </Wrapper>
  );
}

LoggedAs.propTypes = {};

export default LoggedAs;
