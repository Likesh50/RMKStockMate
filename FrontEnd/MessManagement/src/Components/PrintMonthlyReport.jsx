// PrintMonthlyReport.js
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { MonthlyReport } from './MonthlyReport'; // Adjust the path as needed
import styled from 'styled-components';

const Test=styled.div`
    height:100%;
`;
const PrintMonthlyReport = () => {
  const reportRef = useRef();

  return (
    <Test>
      <ReactToPrint
        trigger={() => <button>Print Monthly Report</button>}
        content={() => reportRef.current}
      />
      <MonthlyReport ref={reportRef} />
    </Test>
  );
};

export default PrintMonthlyReport;
