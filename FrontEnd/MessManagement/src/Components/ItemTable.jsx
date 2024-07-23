import React from 'react';
import './ItemTable.css'; // Import your CSS file

const ItemTable = () => {
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
  );
};

export default ItemTable;
