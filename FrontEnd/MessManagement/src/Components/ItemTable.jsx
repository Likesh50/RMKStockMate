import React, { useState, useRef } from 'react';
import './ItemTable.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const ItemTable = () => {
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
    <div>
        <div className="form-container">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker label="Basic date picker" className="date-picker" />
                </DemoContainer>
            </LocalizationProvider>
            <label>No of records:</label>
            <input 
                type='number' 
                id='num-records' 
                className="input-number" 
                ref={numRecordsRef} 
            />
            <button className="add-button" onClick={handleAddRows}>Add</button>
        </div>
        <table className="item-table">
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
                    <td>{row.sno}</td>
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
        </table>
        <div className="submit-container">
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  );
};

export default ItemTable;
