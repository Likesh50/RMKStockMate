import React, { useState, useRef } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  h1 {
    color: #164863;
    text-align: center;
  }
`;

const FormContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 450px;
`;

const Records = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-left: 12px;
  }
`;

const InputNumber = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f4f4f4;
  margin-left: 10px;
`;

const AddButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #164863;
  color: white;
  cursor: pointer;
  font-size: 14px;
  margin-top: 24px;
  margin-left: 10px;

  &:hover {
    background-color: #0a3d62;
  }
`;

const ItemTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  table-layout: auto;

  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
    transition: background-color 0.3s, color 0.3s;
  }

  th {
    background-color: #164863;
    color: white;
    font-size: 16px;
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
    padding: 8px;
    font-size: 14px;
    width: 90%;
    box-sizing: border-box;
    transition: border-color 0.3s, box-shadow 0.3s;
    background-color: #fff;
  }

  td input:focus {
    border-color: #164863;
    outline: none;
    box-shadow: 0 0 5px rgba(22, 72, 99, 0.3);
  }

  td input::placeholder {
    color: #888;
    font-style: italic;
  }

  td select {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    font-size: 14px;
    min-width: 180px;
  }

  .sno {
    min-width: 50px;
  }

  /* Specific column widths */
  th:nth-child(4),
  td:nth-child(4) {
    width: 130px;
  }

  th:nth-child(5),
  td:nth-child(5) {
    width: 130px;
  }

  th:nth-child(6),
  td:nth-child(6) {
    width: 130px;
  }

  th:nth-child(7),
  td:nth-child(7) {
    width: 130px;
  }
`;

const SubmitContainer = styled.div`
  margin-top: 20px;
  text-align: center;
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

function Dispatch() {
  const [rows, setRows] = useState([{ id: Date.now(), sno: 1, quantity: '', amount: '' }]);
  const numRecordsRef = useRef(null);

  const handleAddRows = () => {
    const numberOfRows = parseInt(numRecordsRef.current.value, 10);
    if (numberOfRows > 0) {
      const lastSno = rows.length > 0 ? rows[rows.length - 1].sno : 0;
      const newRows = Array.from({ length: numberOfRows }, (_, index) => ({
        id: Date.now() + index,
        sno: lastSno + index + 1,
        quantity: '',
        amount: ''
      }));
      setRows(prevRows => [...prevRows, ...newRows]);
      numRecordsRef.current.value = '';
    }
  };

  const handleInputChange = (id, field, value) => {
    const numericValue = value === '' ? '' : parseFloat(value) || 0;
    setRows(prevRows =>
      prevRows.map(row =>
        row.id === id ? { ...row, [field]: numericValue, totalAmount: (row.quantity || 0) * (row.amount || 0) } : row
      )
    );
  };

  const handleSubmit = () => {
    // Add your submit logic here
    alert('Form submitted');
  };

  return (
    <Container>
      <h1>DISPATCH</h1>
      <FormContainer>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker label="Basic date picker" className="date-picker" />
          </DemoContainer>
        </LocalizationProvider>
        <Records>
          <label>No of records:</label>
          <InputNumber
            type='number'
            id='num-records'
            ref={numRecordsRef}
          />
        </Records>
        <AddButton onClick={handleAddRows}>Add</AddButton>
      </FormContainer>
      <ItemTable>
        <thead>
          <tr>
            <th>SNo</th>
            <th>Select Items</th>
            <th>Total Quantity</th>
            <th>RMK</th>
            <th>RMD</th>
            <th>RMKCET</th>
            <th>School</th>
            <th>Current Quantity</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.id}>
              <td className='sno'>{row.sno}</td>
              <td>
                <select className="item-select">
                  <option value="">SELECT</option>
                  {/* Add more options as needed */}
                </select>
              </td>
              <td>
                <input
                  type="number"
                  className="item-input"
                  placeholder="Total Quantity"
                  onChange={(e) => handleInputChange(row.id, 'totalQuantity', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="item-input"
                  placeholder="Quantity"
                  onChange={(e) => handleInputChange(row.id, 'quantity', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="item-input"
                  placeholder="Quantity"
                  onChange={(e) => handleInputChange(row.id, 'quantity', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="item-input"
                  placeholder="Quantity"
                  onChange={(e) => handleInputChange(row.id, 'quantity', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="item-input"
                  placeholder="Quantity"
                  onChange={(e) => handleInputChange(row.id, 'quantity', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="item-input"
                  placeholder="Current Quantity"
                  onChange={(e) => handleInputChange(row.id, 'currentQuantity', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </ItemTable>
      <SubmitContainer>
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
      </SubmitContainer>
    </Container>
  );
}

export default Dispatch;
