import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
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
  table-layout: fixed;

  th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
    overflow-wrap: break-word;
    word-break: break-word;
    font-size: 14px;
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

export const MonthlyReport = React.forwardRef(({ fromDate, toDate }, ref) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get('http://localhost:3002/monthly/report', {
      params: {
        fdate: fromDate,
        tdate: toDate
      }
    })
    .then(res => {
      setData(res.data || []); 
      setLoading(false);
      console.log(data);
    })
    .catch(err => {
      console.error("Error fetching report data:", err);
      setLoading(false);
    });
  }, [fromDate, toDate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container ref={ref} className="print-container">
      <PrintHeader>
        <div className="content">
          <img src={Logo} alt="Logo" />
          <h1>FOOD MANAGEMENT</h1>
        </div>
      </PrintHeader>
      <h1>Monthly Report</h1>
      <DateRange>
        <h2>From: {fromDate}</h2>
        <h2>To: {toDate}</h2>
      </DateRange>
      <ItemTable>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Purchase Quantity</th>
            <th>Purchase Amount</th>
            <th>Closing Stock</th>
            <th>RMK Quantity</th>
            <th>RMK Amount</th>
            <th>RMD Quantity</th>
            <th>RMD Amount</th>
            <th>RMKCET Quantity</th>
            <th>RMKCET Amount</th>
            <th>School Quantity</th>
            <th>School Amount</th>
            <th>Issue Total Quantity</th>
            <th>Issue Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => {
              const unitPrice = row.unitPrice;
              return (
                <tr key={index}>
                  <td>{row.item}</td>
                  <td>{row.purchaseQuantity}</td>
                  <td>{row.purchaseAmount.toFixed(2)}</td>
                  <td>{row.closingStock}</td>
                  <td>{row.RMK}</td>
                  <td>{(row.RMK * unitPrice).toFixed(2)}</td>
                  <td>{row.RMD}</td>
                  <td>{(row.RMD * unitPrice).toFixed(2)}</td>
                  <td>{row.RMKCET}</td>
                  <td>{(row.RMKCET * unitPrice).toFixed(2)}</td>
                  <td>{row.RMKSCHOOL}</td>
                  <td>{(row.RMKSCHOOL * unitPrice).toFixed(2)}</td>
                  <td>{(row.RMK + row.RMD + row.RMKCET + row.RMKSCHOOL).toFixed(2)}</td>
                  <td>{((row.RMK + row.RMD + row.RMKCET + row.RMKSCHOOL) * unitPrice).toFixed(2)}</td>
                </tr>
              );
            })
          ) : (
            <tr><td colSpan="13">No data available</td></tr>
          )}
        </tbody>
      </ItemTable>
    </Container>
  );
});
