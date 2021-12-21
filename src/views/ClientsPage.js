import React from 'react';
import styled from 'styled-components';
import ViewWrapper from 'components/atoms/ViewWrapper/ViewWrapper';
import { useClients } from 'hooks/useClients';
import { ElementWrapper } from 'components/atoms/ElementWrapper/ElementWrapper';
import { useNavigate } from 'react-router';

const StyledViewWrapper = styled(ViewWrapper)`
  margin: 4rem;
  max-width: 900px;
  align-self: center;
  min-height: 80%;
  min-width: 900px;
  justify-self: center;
`;
const StyledElementWrapper = styled(ElementWrapper)`
  margin: 1rem;
  cursor: pointer;
`;

const ClientsPage = () => {
  const navigate = useNavigate();
  const { data = [] } = useClients();

  const handleOpenClientDetails = (id) => {
    navigate(`/clients/${id}`);
  };
  return (
    <StyledViewWrapper title="Clients">
      {data.map((client) => (
        <StyledElementWrapper key={client.id} onClick={() => handleOpenClientDetails(client.id)}>
          {client.name}
        </StyledElementWrapper>
      ))}
    </StyledViewWrapper>
  );
};

ClientsPage.propTypes = {};

export default ClientsPage;
