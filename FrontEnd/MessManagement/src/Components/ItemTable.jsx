import React, { useState, useRef, useEffect } from 'react';
import './ItemTable.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';

const ItemTable = () => {
  const [rows, setRows] = useState([{ id: Date.now(), sno: 1, quantity: '', amount: '', item: '', category: '' }]);
  const numRecordsRef = useRef(null);
  const [items, setItems] = useState([]);
  const [date, setDate] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        console.log("Fetching items...");
        const response = await axios.get("http://localhost:3002/purchase/getItems");
        console.log("Items fetched:", response.data);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const fetchCategoryForItem = (itemName) => {
    const item = items.find(i => i.item === itemName);
    return item ? item.category : '';
  };

  const handleAddRows = () => {
    const numberOfRows = parseInt(numRecordsRef.current.value, 10);
    if (numberOfRows > 0) {
      const lastSno = rows.length > 0 ? rows[rows.length - 1].sno : 0;
      const lastSno = rows.length > 0 ? rows[rows.length - 1].sno : 0;
      const newRows = Array.from({ length: numberOfRows }, (_, index) => ({
        id: Date.now() + index,
        sno: lastSno + index + 1,
        id: Date.now() + index,
        sno: lastSno + index + 1,
        quantity: '',
        amount: '',
        item: '',
        category: ''
      }));
      setRows(prevRows => [...prevRows, ...newRows]);
      numRecordsRef.current.value = '';
      numRecordsRef.current.value = '';
    }
  };

  const handleInputChange = (id, field, value) => {
    if (field === 'item') {
      const category = fetchCategoryForItem(value);
      setRows(prevRows =>
        prevRows.map(row =>
          row.id === id ? { ...row, [field]: value, category } : row
        )
      );
    } else {
      const numericValue = value === '' ? 0 : parseFloat(value);
      setRows(prevRows =>
        prevRows.map(row =>
          row.id === id ? { ...row, [field]: numericValue, totalAmount: (row.quantity || 0) * (row.amount || 0) } : row
        )
      );
    }
  };

  const handleSubmit = async () => {
    if (!date) {
      alert("Please enter the date.");
      return;
    }

    // Format date to YYYY-MM-DD format
    const formattedDate = date.format('YYYY-MM-DD');

    // Prepare data to send
    const formattedRows = rows.map(row => ({
      ...row,
      amount: isNaN(row.amount) ? 0 : row.amount,
      quantity: isNaN(row.quantity) ? 0 : row.quantity,
      totalAmount: isNaN(row.totalAmount) ? 0 : row.totalAmount // Ensure totalAmount is valid
    }));

    try {
      console.log("Submitting data...", { date: formattedDate, arr: formattedRows });
      const response = await axios.post('http://localhost:3002/purchase/add', {
        date: formattedDate,
        arr: formattedRows
      });
      console.log("Response from server:", response.data);
      alert("Items added successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div>
      <div className="form-container">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Basic date picker"
            className="date-picker"
            onChange={(newDate) => setDate(newDate)}
            value={date}
            format="YYYY-MM-DD" // Ensure that the date picker uses the correct format
          />
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
          <tr>
            <th>SNo</th>
            <th>Select Item</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Total Amount</th>
          </tr>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.id}>
              <td>{row.sno}</td>
              <td>
                <select
                  className="item-select"
                  value={row.item}
                  onChange={(e) => handleInputChange(row.id, 'item', e.target.value)}
                >
                  <option value="">SELECT</option>
                  {items.map((item, idx) => (
                    <option key={idx} value={item.item}>
                      {item.item}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="text"
                  className="item-input"
                  placeholder="Category"
                  value={row.category}
                  readOnly
                />
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

export default ItemTableComponent;
