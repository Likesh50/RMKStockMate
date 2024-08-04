import React, { useState, useEffect, forwardRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 20px;
`;

export const ItemReport = forwardRef(({ fromDate, toDate }, ref) => {
  const [selectedItem, setSelectedItem] = useState('');
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    // Fetch items for the dropdown
    axios.get('http://localhost:3002/item/getItems')
      .then(response => {
        setItems(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
        setError('Failed to load items.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedItem) {
      // Fetch data for the selected item
      axios.get('http://localhost:3002/item/report', {
        params: {
          item: selectedItem,
          fdate: fromDate,
          tdate: toDate
        }
      })
        .then(response => {
          if (response.data.length === 0) {
            setError('No data found for the selected item and date range.');
          } else {
            setData(response.data);
            setError(null); // Clear error if data is fetched successfully
          }
        })
        .catch(error => {
          console.error('Error fetching item data:', error);
          setError('Failed to load item data.');
        });
    } else {
      setData([]);
    }
  }, [selectedItem, fromDate, toDate]);

  const handleItemChange = (e) => {
    setSelectedItem(e.target.value);
    setData([]); // Clear the table data on dropdown change
  };

  return (
    <Container ref={ref} className="print-container">
      <PrintHeader>
        <div className="content">
          <img src={Logo} alt="College Logo" />
          <h1>FOOD MANAGEMENT SYSTEM</h1>
        </div>
      </PrintHeader>
      <h1>Item-Wise Report</h1>
      {error && <ErrorMessage>{error}</ErrorMessage>} {/* Display error message if there is one */}
      <Dropdown value={selectedItem} onChange={handleItemChange}>
        <option value="">Select Item</option>
        {items.map((item, index) => (
          <option key={index} value={item.item}>
            {item.item}
          </option>
        ))}
      </Dropdown>
      <DateRange>
        <h2>From: {fromDate}</h2>
        <h2>To: {toDate}</h2>
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
              <th colSpan="2">Issued</th>
              <th colSpan="2">Purchased</th>
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
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && selectedItem && !error && (
              <tr>
                <td colSpan="12">Loading...</td>
              </tr>
            )}
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.item}</td>
                <td>{row.RMK_quantity}</td>
                <td>{row.RMK_amount}</td>
                <td>{row.RMD_quantity}</td>
                <td>{row.RMD_amount}</td>
                <td>{row.RMKCET_quantity}</td>
                <td>{row.RMKCET_amount}</td>
                <td>{row.RMKSCHOOL_quantity}</td>
                <td>{row.RMKSCHOOL_amount}</td>
                <td>{row.RMK_quantity+row.RMD_quantity+row.RMKCET_quantity+row.RMKSCHOOL_quantity}</td>
                <td>{row.RMK_amount+row.RMD_amount+row.RMKCET_amount+row.RMKSCHOOL_amount}</td>
                <td>{row.Purchased_quantity}</td>
                <td>{row.Purchased_amount}</td>
              </tr>
            ))}
          </tbody>
        </ItemTable>
      </TableContainer>
    </Container>
  );
});
