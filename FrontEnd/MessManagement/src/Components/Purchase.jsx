import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Styled components
const Container = styled.div`
  h1 {
    color: #164863;
    text-align: center;
    font-weigth:800;
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
  margin-top:24px;
  width:190px;
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
    border: none;
    border-radius: 4px;
    padding: 8px;
    font-size: 14px;
  }

  td input:focus {
    outline: 2px solid #164863;
  }

  .item-select {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    font-size: 14px;
  }

  .sno {
    min-width: 50px;
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

const Purchase = () => {
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

  const handleAddOneRow = () => {
    const lastSno = rows.length > 0 ? rows[rows.length - 1].sno : 0;
    setRows(prevRows => [
      ...prevRows,
      { id: Date.now(), sno: lastSno + 1, quantity: '', amount: '' }
    ]);
  };

  const handleSubmit = () => {
    // Add your submit logic here
    alert('Form submitted');
  };

  return (
    <Container>
      <h1>PURCHASE</h1>
      <FormContainer>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker label="Basic date picker" className="date-picker" />
          </DemoContainer>
        </LocalizationProvider>
        <Records>
          <InputNumber
            type='number'
            id='num-records'
            placeholder='No of rows to be added'
            ref={numRecordsRef}
          />
        </Records>
        <AddButton onClick={handleAddRows}>Add</AddButton>
      </FormContainer>
      <ItemTable>
        <thead>
          <tr>
            <th>SNo</th>
            <th>Select Item</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Total Amount</th>
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
                <input type="text" className="item-input" placeholder="Category" />
              </td>
              <td>
                <input
                  type="number"
                  className="item-input"
                  placeholder="Quantity"
                  value={row.quantity}
                  onChange={(e) => handleInputChange(row.id, 'quantity', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="item-input"
                  placeholder="Amount"
                  value={row.amount}
                  onChange={(e) => handleInputChange(row.id, 'amount', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="item-input"
                  placeholder="Total Amount"
                  value={(row.quantity || 0) * (row.amount || 0)}
                  readOnly
                />
              </td>
            </tr>
          ))}
        </tbody>
        
      </ItemTable>
      <SubmitContainer>
      <SubmitButton className="add-button" onClick={handleAddOneRow}>Add</SubmitButton>
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
      </SubmitContainer>
    </Container>
  );
};

export default Purchase;
