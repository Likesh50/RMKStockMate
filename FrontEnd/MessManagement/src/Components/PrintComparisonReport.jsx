import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import styled from 'styled-components';
import { ComparisonReport } from './ComparisonReport';

const Test = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top:-150px;
`;

const PrintButton = styled.button`
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 20px;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #45a049;
    box-shadow: 0 8px 10px rgba(0, 0, 0, 0.2);
  }

  &:active {
    background-color: #3e8e41;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transform: translateY(2px);
  }
`;

const PrintComparisonReport = () => {
  const reportRef = useRef();

  return (
    <Test>
      <ReactToPrint
        trigger={() => <PrintButton>Print Comparison Report</PrintButton>}
        content={() => reportRef.current}
      />
      <ComparisonReport ref={reportRef}/>
    </Test>
  );
};

export default PrintComparisonReport;
