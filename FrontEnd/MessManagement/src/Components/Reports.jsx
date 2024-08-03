import React, { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ReportsContainer = styled.div`
  padding: 0px 20px;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReportsHeader = styled.h1`
  margin-bottom: 10px; 
  color: #164863;
  margin-top: 0px;
`;

const ReportsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  width: 100%;
  max-width: 1000px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ReportCardContainer = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReportCardTitle = styled.h2`
  margin-bottom: 20px;
  color: #164863;
  font-size: 1.5rem;
  font-weight: 600;
`;

const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;

  .MuiFormControl-root {
    margin-bottom: 15px;
  }
`;

const FetchButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;


const ReportCard = ({ title,route }) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const navigate = useNavigate();

  const handleFetch = () => {
    navigate(route);
  };

  return (
    <ReportCardContainer>
      <ReportCardTitle>{title}</ReportCardTitle>
      <DatePickerContainer>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="From"
              value={fromDate}
              onChange={(newValue) => setFromDate(newValue)}
            />
            <DatePicker
              label="To"
              value={toDate}
              onChange={(newValue) => setToDate(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </DatePickerContainer>
      <FetchButton onClick={handleFetch}>Fetch</FetchButton>
    </ReportCardContainer>
  );
};

const Reports = () => {
  return (
    <ReportsContainer>
      <ReportsHeader>REPORTS</ReportsHeader>
      <ReportsGrid>
        <ReportCard title="Monthly" route="/dashboard/reports/monthly" />
        <ReportCard title="Category-wise" route="/dashboard/reports/category-wise" />
        <ReportCard title="Item-wise" route="/dashboard/reports/item-wise" />
        <ReportCard title="Comparison" route="/dashboard/reports/comparison" />
      </ReportsGrid>
    </ReportsContainer>
  );
};

export default Reports;
