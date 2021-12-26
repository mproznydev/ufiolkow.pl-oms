import React, { useState } from 'react';
import { SearchWrapper, Input, SearchResultsWrapper, SearchResult } from 'components/organisms/SearchBar/SearchBar.styles';
import { useClients } from 'hooks/useClients';
import { useNavigate } from 'react-router-dom';

function SearchBar({ className }) {
  const { data: clients } = useClients();
  const navigate = useNavigate();
  const [matchingClients, setMatchingClients] = useState([]);

  const handleChange = (e) => {
    const matchingClients = clients.filter((client) => {
      const searchedClinet = e.target.value.toLowerCase();
      const clientName = client.name.toLowerCase();
      return clientName.includes(searchedClinet);
    });

    setMatchingClients(matchingClients);

    if (e.target.value === '') {
      setMatchingClients(['']);
    }
  };

  const handleOpenClientDetails = (id) => {
    navigate(`/clients/${id}`);
  };

  return (
    <SearchWrapper className={className} as="form">
      <Input type="search" placeholder="find client" id="search" name="name" autoComplete="off" onChange={handleChange}></Input>
      <SearchResultsWrapper>
        {matchingClients
          ? matchingClients.map((client) => (
              <SearchResult key={client.id} onClick={() => handleOpenClientDetails(client.id)}>
                {client.name}
              </SearchResult>
            ))
          : null}
      </SearchResultsWrapper>
    </SearchWrapper>
  );
}

SearchBar.propTypes = {};

export default SearchBar;
