import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  padding: 0px;
  text-align: center;
`;

const Heading = styled.h1`
  color: #164863;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 80%;
  border-collapse: collapse;
  text-align: center;
  margin-left: 140px;
`;

const Th = styled.th`
  background-color: #164863;
  color: white;
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;

  &:nth-child(1) {
    width: 50px;
  }

  &:not(:nth-child(1)) {
    min-width: 200px;
  }
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;

  &:nth-child(1) {
    width: 50px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: 2px solid #164863;
  }
`;

const Select = styled.select`
  width: 80%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;

  .search-input {
    padding: 10px;
    border: 1px solid #164863;
    border-radius: 4px;
    font-size: 16px;
    width: 230px;
    box-sizing: border-box;
    margin-right: 10px;
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s;
    background-color: #f4f4f4;

    &::placeholder {
      color: #888;
    }

    &:focus {
      border-color: #0a3d62;
      box-shadow: 0 0 8px rgba(76, 175, 80, 0.3);
    }
  }

  .add-button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #164863;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;

    &:hover {
      background-color: #0a3d62;
    }

    &:active {
      transform: scale(0.98);
    }
  }
`;

const SubmitContainer = styled.div`
  margin-top: 20px;
  text-align: center;

  .add-button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #164863;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    margin-right: 10px;

    &:hover {
      background-color: #0a3d62;
    }

    &:active {
      transform: scale(0.98);
    }
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const AddItems = () => {
  const [rows, setRows] = useState(1);
  const [inputValue, setInputValue] = useState('');

  const handleAddRows = () => {
    const numRowsToAdd = parseInt(inputValue, 10);
    if (!isNaN(numRowsToAdd) && numRowsToAdd > 0) {
      setRows(rows + numRowsToAdd);
      setInputValue('');
    }
  };

  const handleAddOneRow = () => {
    setRows(rows + 1);
  };

  const handleSubmit = () => {
    // Add your submit logic here
    alert('Form submitted');
  };

  return (
    <Container>
      <Heading>Add Items</Heading>
      <SearchContainer>
        <input
          type="number"
          className="search-input"
          placeholder="No of rows to be added"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="add-button" onClick={handleAddRows}>ADD</button>
      </SearchContainer>
      <Table>
        <thead>
          <tr>
            <Th>SNo</Th>
            <Th>Select Item</Th>
            <Th>Category</Th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, index) => (
            <tr key={index}>
              <Td>{index + 1}</Td>
              <Td><Input placeholder="ITEMS" /></Td>
              <Td>
                <Select>
                  <option value="" disabled selected>Select Category</option>
                  <option value="Category1">Category1</option>
                  <option value="Category2">Category2</option>
                  <option value="Category3">Category3</option>
                </Select>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <SubmitContainer>
        <button className="add-button" onClick={handleAddOneRow}>ADD</button>
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
      </SubmitContainer>
    </Container>
  );
};

export default AddItems;
