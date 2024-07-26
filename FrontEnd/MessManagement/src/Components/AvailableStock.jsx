import React from 'react';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  h1 {
    color: #164863;
    text-align: center;
  }
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
    width: 300px;
    box-sizing: border-box;
    margin-right: 10px;
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s;
    background-color: #f4f4f4;

    &::placeholder {
      color: #888;
    }

    &:focus {
      border-color: #4caf50;
      box-shadow: 0 0 8px rgba(76, 175, 80, 0.3);
    }
  }

  .search-button {
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
  }
`;

const TableHeader = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-family: Arial, sans-serif;

  th {
    background-color: #164863;
    color: white;
    font-size: 16px;
    font-weight: bold;
    padding: 10px;
    border: 1px solid #ddd;
    text-align: center;
    min-width: 200px;
  }

  td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: center;
    font-size: 16px;
  }

  tbody tr:nth-child(even) {
    background-color: #f4f4f4;
  }
`;

function AvailableStock() {
  return (
    <Container>
      <h1>AVAILABLE STOCK</h1>
      <SearchContainer>
        <input
          type="text"
          className="search-input"
          placeholder="Enter item name"
        />
        <button className="search-button">Search</button>
      </SearchContainer>
      <TableHeader>
        <thead>
          <tr>
            <th>ITEMS</th>
            <th>CATEGORY</th>
            <th>QUANTITY</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Item 1</td>
            <td>Category A</td>
            <td>100</td>
          </tr>
          <tr>
            <td>Item 2</td>
            <td>Category B</td>
            <td>150</td>
          </tr>
          <tr>
            <td>Item 3</td>
            <td>Category C</td>
            <td>200</td>
          </tr>
          <tr>
            <td>Item 4</td>
            <td>Category D</td>
            <td>250</td>
          </tr>
        </tbody>
      </TableHeader>
    </Container>
  );
}

export default AvailableStock;
