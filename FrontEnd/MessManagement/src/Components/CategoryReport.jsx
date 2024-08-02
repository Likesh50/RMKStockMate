import React from 'react';
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
    font-size:18px;
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
  margin-bottom: 20px;
  img {
    width: 150px;
    height: auto;
    margin-bottom: 10px;
  }

  h1 {
    font-size: 30px;
  }

  @media print {
    display: block;
  }
`;

export const CategoryReport = React.forwardRef((props, ref) => {
    const data = [
        {
          itemName: 'Projector',
          RMK: 5,
          RMD: 3,
          RMKCET: 2,
          School: 1,
          issueTotal: 11
        },
        {
          itemName: 'Laptop',
          RMK: 10,
          RMD: 8,
          RMKCET: 6,
          School: 4,
          issueTotal: 28
        },
        {
          itemName: 'Whiteboard',
          RMK: 7,
          RMD: 5,
          RMKCET: 3,
          School: 2,
          issueTotal: 17
        },
        {
          itemName: 'Chair',
          RMK: 15,
          RMD: 12,
          RMKCET: 10,
          School: 8,
          issueTotal: 45
        }
      ];
      

  return (
    <Container ref={ref} className="print-container">
      <PrintHeader>
        <img src={Logo} alt="College Logo" />
        <h1>College Name</h1>
      </PrintHeader>
      <h1>Category Report</h1>
      <DateRange>
        <h2>From: 12.7.2004</h2>
        <h2>To: 12.7.2004</h2>
      </DateRange>
      <ItemTable>
        <thead>
          <tr>
            <th >Item Name</th>
            <th >RMK</th>
            <th >RMD</th>
            <th >RMKCET</th>
            <th >School</th>
            <th >Issue Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.itemName}</td>
              <td>{row.RMK}</td>
              <td>{row.RMD}</td>
              <td>{row.RMKCET}</td>
              <td>{row.School}</td>
              <td>{row.issueTotal}</td>
            </tr>
          ))}
        </tbody>
      </ItemTable>
    </Container>
  );
});
