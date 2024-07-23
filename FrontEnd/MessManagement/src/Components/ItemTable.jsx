import React from 'react';
import './ItemTable.css'; // Import your CSS file
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const ItemTable = () => {
  return (
    <div>
        <div className="form-container">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker label="Basic date picker" className="date-picker" />
                </DemoContainer>
            </LocalizationProvider>
            <label>No of records:</label>
            <input type='number' className="input-number"/>
            <button className="add-button">Add</button>
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
            <tr>
            <td>1</td>
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
                <input type="number" className="item-input" placeholder="Quantity" />
            </td>
            <td>
                <input type="text" className="item-input" placeholder="Amount" />
            </td>
            <td>
                <input type="text" className="item-input" placeholder="Total Amount" readOnly />
            </td>
            </tr>
        </tbody>
        </table>
    </div>
  );
};

export default ItemTable;
