import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import styled from 'styled-components';
import { CategoryReport } from './CategoryReport';
import { useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Test = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Change this to flex-start */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px; /* Adjust space between buttons */
  top: 150px; /* Adjust the top position */
  z-index: 10; /* Ensure buttons are above other content */
  padding: 10px; /* Optional: padding for aesthetics */
  border-radius: 8px; /* Optional: rounded corners */
`;

const ReportContainer = styled.div`
  margin-top: 80px; /* Add margin to ensure report is below buttons */
  width: 100%;
  max-height: 80vh; /* Set a fixed height for the report */
  overflow-y: auto; /* Allow scrolling if content exceeds height */
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

const ExportButton = styled.button`
  background-color: #2196F3; /* Blue */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #1976D2;
    box-shadow: 0 8px 10px rgba(0, 0, 0, 0.2);
  }

  &:active {
    background-color: #1565C0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transform: translateY(2px);
  }
`;

const PrintCategoryReport = () => {
  const reportRef = useRef();
  const location = useLocation();
  const { fromDate, toDate } = location.state || {};

  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(reportRef.current.querySelector('table'));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Category Report');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'Category_Report.xlsx');
  };

  return (
    <Test>
      <ButtonContainer>
        <ReactToPrint
          trigger={() => <PrintButton>Print Category Report</PrintButton>}
          content={() => reportRef.current}
        />
        <ExportButton onClick={handleExport}>Export to Excel</ExportButton>
      </ButtonContainer>
      <ReportContainer>
        <CategoryReport ref={reportRef} fromDate={fromDate} toDate={toDate} />
      </ReportContainer>
    </Test>
  );
};

export default PrintCategoryReport;
