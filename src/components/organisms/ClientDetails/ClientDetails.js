import React from 'react';
import styled from 'styled-components';
import { useClient } from 'hooks/useClient';
import { useParams } from 'react-router';
import ViewWrapper from 'components/atoms/ViewWrapper/ViewWrapper';

const StyledViewWrapper = styled(ViewWrapper)`
  margin: 4rem;
  max-width: 900px;
  align-self: center;
  min-height: 80%;
  min-width: 900px;
  justify-self: center;
`;

const ClientDetails = () => {
  const { id } = useParams();
  const { data: client = {} } = useClient(id);

  return (
    <StyledViewWrapper title="client details">
      <h3 style={{ textAlign: 'center', marginTop: '2rem' }}>We are working on it...</h3>
    </StyledViewWrapper>
  );
};

export default ClientDetails;
