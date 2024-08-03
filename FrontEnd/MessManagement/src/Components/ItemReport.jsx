import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from '../assets/Logo.png';

const Container = styled.div`
  @media print {
    margin: 20px;
  }

  h1 {
    color: #164863;
    text-align: center;
  }
`;

const ItemTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  table-layout: fixed; /* Ensures columns do not expand beyond their width */

  th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
    overflow-wrap: break-word; /* Handles long text wrapping */
    word-break: break-word; /* Prevents overflow of long words */
    font-size: 18px;
  }

  th {
    background-color: #164863;
    color: white;
    font-size: 20px;
    font-weight: bold;
  }

  tbody tr {
    background-color: #f9f9f9;
  }

  tbody tr:nth-child(even) {
    background-color: #f1f1f1;
  }

  tbody tr:hover {
    background-color: #e0f7fa;
    color: #000;
  }

  td input {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px;
    font-size: 12px;
    width: 90%;
  }

  td select {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px;
    font-size: 12px;
    min-width: 180px;
  }

  .sno {
    min-width: 50px;
  }
  @media print {
    th, td {
      font-size: 14px; 
    }
  }
`;

const DateRange = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  h2 {
    margin: 0;
    font-size: 20px;
  }
`;

const PrintHeader = styled.div`
  display: none;
  text-align: center;

  img {
    width: 150px;
    height: auto;
  }

  h1 {
    font-size: 30px;
  }

  @media print {
    display: block;
  }
`;

const Dropdown = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  font-size: 1rem;
  width: 100%;
  max-width: 300px;
  margin: 20px auto;
  display: block;
`;

const TableContainer = styled.div`
  min-height: 300px; /* Adjust this value as needed */
`;

export const ItemReport = React.forwardRef((props, ref) => {
  const [selectedItem, setSelectedItem] = useState('');

  const data = [
    {
      itemName: 'Item 1',
      RMK: { quantity: 10000000, amount: 10000000 },
      RMD: { quantity: 1500000, amount: 15000000 },
      RMKCET: { quantity: 2000000, amount: 20000000 },
      School: { quantity: 500000, amount: 5000000 },
      IssueTotal: { quantity: 5000000, amount: 50000000 }
    },
    {
      itemName: 'Item 2',
      RMK: { quantity: 5000000, amount: 5000000 },
      RMD: { quantity: 1000000, amount: 10000000 },
      RMKCET: { quantity: 3000000, amount: 30000000 },
      School: { quantity: 200000, amount: 2000000 },
      IssueTotal: { quantity: 9200000, amount: 92000000 }
    },
    // Add more rows as needed
  ];

  const handleItemChange = (e) => {
    setSelectedItem(e.target.value);
  };

  const filteredData = selectedItem
    ? data.filter((item) => item.itemName === selectedItem)
    : data;

  return (
    <Container ref={ref} className="print-container">
      <PrintHeader>
        <div className="content">
          <img src={Logo} alt="College Logo" />
          <h1>FOOD MANAGEMENT SYSTEM</h1>
        </div>
      </PrintHeader>
      <h1>Item-Wise Report</h1>
      <Dropdown value={selectedItem} onChange={handleItemChange}>
        <option value="">Select Item</option>
        {data.map((item, index) => (
          <option key={index} value={item.itemName}>
            {item.itemName}
          </option>
        ))}
      </Dropdown>
      <DateRange>
        <h2>From: 12.7.2004</h2>
        <h2>To: 12.7.2004</h2>
      </DateRange>
      <TableContainer>
        <ItemTable>
          <thead>
            <tr>
              <th rowSpan="2">Item Name</th>
              <th colSpan="2">RMK</th>
              <th colSpan="2">RMD</th>
              <th colSpan="2">RMKCET</th>
              <th colSpan="2">School</th>
              <th colSpan="2">Issue Total</th>
            </tr>
            <tr>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td>{row.itemName}</td>
                <td>{row.RMK.quantity}</td>
                <td>{row.RMK.amount}</td>
                <td>{row.RMD.quantity}</td>
                <td>{row.RMD.amount}</td>
                <td>{row.RMKCET.quantity}</td>
                <td>{row.RMKCET.amount}</td>
                <td>{row.School.quantity}</td>
                <td>{row.School.amount}</td>
                <td>{row.IssueTotal.quantity}</td>
                <td>{row.IssueTotal.amount}</td>
              </tr>
            ))}
          </tbody>
        </ItemTable>
      </TableContainer>
    </Container>
  );
});
