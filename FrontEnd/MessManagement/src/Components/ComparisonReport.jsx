import React from 'react';
import styled from 'styled-components';
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

const dummyData = [
  {
    itemName: 'Item 1',
    January: { quantity: 100, amount: 1000 },
    February: { quantity: 150, amount: 1500 },
  },
  {
    itemName: 'Item 2',
    January: { quantity: 200, amount: 2000 },
    February: { quantity: 250, amount: 2500 },
    March: { quantity: 300, amount: 3000 },
  },
  {
    itemName: 'Item 3',
    February: { quantity: 100, amount: 1000 },
    March: { quantity: 150, amount: 1500 },
    April: { quantity: 200, amount: 2000 },
    June:{ quantity: 200, amount: 2000 },
    July:{ quantity: 200, amount: 2000 },
  },
];

export const ComparisonReport = React.forwardRef((props, ref) => {
  const { data = dummyData, fromDate = '01/01/2024', toDate = '31/12/2024' } = props;

  // Extract unique months from data keys
  const months = Array.from(new Set(data.flatMap(item => Object.keys(item).filter(key => key !== 'itemName'))));

  return (
    <Container ref={ref} className="print-container">
      <PrintHeader>
        <div className="content">
          <img src={Logo} alt="College Logo" />
          <h1>FOOD MANAGEMENT</h1>
        </div>
      </PrintHeader>
      <h1>Comparison Report</h1>
      <DateRange>
        <h2>From: {fromDate}</h2>
        <h2>To: {toDate}</h2>
      </DateRange>
      <ItemTable>
        <thead>
          <tr>
            <th rowSpan="2">Item Name</th>
            {months.map(month => (
              <th colSpan="2" key={month}>{month}</th>
            ))}
          </tr>
          <tr>
            {months.map(month => (
              <React.Fragment key={month}>
                <th key={`${month}-quantity`}>Quantity</th>
                <th key={`${month}-amount`}>Amount</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.itemName}</td>
              {months.map(month => (
                <React.Fragment key={month}>
                  <td key={`${month}-quantity-${index}`}>{row[month]?.quantity ?? '-'}</td>
                  <td key={`${month}-amount-${index}`}>{row[month]?.amount ?? '-'}</td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </ItemTable>
    </Container>
  );
});
