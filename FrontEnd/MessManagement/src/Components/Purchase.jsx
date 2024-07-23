import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import './purchase.css';
import "./tables.css";

// Setting up Axios interceptors for logging requests and responses
axios.interceptors.request.use(request => {
  console.log('Starting Request', request);
  return request;
});

axios.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
});

export default function Purchase() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState([{ item: "", category: "", quantity: 0, amount: 0, total: 0 }]);
  const [date, setDate] = useState("");
  const [numRows, setNumRows] = useState(1);

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
    console.log("Working");
    fetchItems();
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedFormData = [...formData];
    updatedFormData[index] = { ...updatedFormData[index], [field]: value };
    if (field === 'quantity' || field === 'amount') {
      updatedFormData[index].total = updatedFormData[index].quantity * updatedFormData[index].amount;
    }
    setFormData(updatedFormData);
  };

  const addRows = () => {
    const newRows = Array.from({ length: numRows }, () => ({ item: "", category: "", quantity: 0, amount: 0, total: 0 }));
    setFormData([...formData, ...newRows]);
  };

  const submit = async () => {
    if (!date) {
      alert("Please enter the date.");
      return;
    }

    try {
      console.log("Submitting data...", { date, arr: formData });
      const response = await axios.post('http://localhost:3002/purchase/add', {
        date,
        arr: formData
      });
      console.log("Response from server:", response.data);
      alert("Items added successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-9">
          <div className="container">
            <h1 className="h1-dis">FOOD MANAGEMENT SYSTEM</h1>
            <h2 className="h2-dis">PURCHASE</h2>
            <div className="row r-dis">
              <div className="col-3">
                <label htmlFor="date" id="date-label"><b>Date:</b></label>
                <input type="date" id="date" name="date" className="inpt-d" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="col-3"></div>
              <div className="col-3">
                <label htmlFor="number" id="row"><b>Enter number of rows:</b></label>
                <div className="div">
                  <input 
                    type="number" 
                    id="num" 
                    className="inpt-r" 
                    min='1' 
                    value={numRows} 
                    onChange={(e) => setNumRows(Number(e.target.value))} 
                  />
                  <button className="btn btn-primary btn-pur" id="add-btn" onClick={addRows}>Add</button>
                </div>
              </div>
            </div>
            <div className="row tab-dis">
              <Table striped bordered hover id="table">
                <thead className="t-pur">
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
                  {formData.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={row.item}
                          onChange={(e) => handleInputChange(index, 'item', e.target.value)}
                        >
                          <option value="">Select</option>
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
                          className="form-control"
                          placeholder="Category"
                          value={row.category}
                          onChange={(e) => handleInputChange(index, 'category', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Quantity"
                          value={row.quantity}
                          onChange={(e) => handleInputChange(index, 'quantity', Number(e.target.value))}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Amount"
                          value={row.amount}
                          onChange={(e) => handleInputChange(index, 'amount', Number(e.target.value))}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Total Amount"
                          value={row.total}
                          disabled
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <button className="btn btn-primary btn-dis1" id="submit-btn" onClick={submit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
