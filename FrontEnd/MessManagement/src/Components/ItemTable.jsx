import React from 'react';
import { useState,useEffect } from 'react';
import './ItemTable.css'; // Import your CSS file
import axios from "axios";
const ItemTable = () => {
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
    console.log("working");
    fetchItems();
  }, []);
  return (
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
  );
};

export default ItemTable;
