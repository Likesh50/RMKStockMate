import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { events } from './data';
import { FaSearch } from 'react-icons/fa';

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #164863;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background: #fff;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: none;
  outline: none;
  font-size: 1rem;
`;

const EventItem = styled(Link)`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  margin-bottom: 10px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: #333;
  &:hover {
    background: #f1f1f1;
  }
`;

const EventList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events.filter(event =>
    event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Title>Events</Title>
      <SearchContainer>
        <FaSearch />
        <SearchInput
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>
      {filteredEvents.map(event => (
        <EventItem key={event.id} to={`/dashboard/eventlist/${event.id}`}>
          <span>{event.eventName}</span>
          <span>{event.date}</span>
        </EventItem>
      ))}
    </Container>
  );
};

export default EventList;
