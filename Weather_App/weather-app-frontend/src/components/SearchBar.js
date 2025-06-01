import React from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

const SearchBar = ({ onSearch, city, setCity }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button variant="primary" type="submit">
          Search
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;