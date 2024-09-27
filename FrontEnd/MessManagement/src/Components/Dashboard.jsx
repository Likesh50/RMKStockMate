import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import DashboardPieChart from './DashboardBarGraph2';
import DashboardBarGraph from './DashboardBarGraph';
import DashboardLineChart from './DashboardLineChart';
import DashboardBarGraph2 from './DashboardBarGraph2';


function DashBoard() {

    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const dummyData = [
        { name: "Group A", value: 400 },
        { name: "Group B", value: 300 },
        { name: "Group C", value: 300 },
        { name: "Group D", value: 200 },
      ];

    const dummyDetails = [
        { status: "Enrolled", students: 400 },
        { status: "Graduated", students: 300 },
        { status: "Dropped", students: 100 },
        { status: "Transferred", students: 150 },
      ];      

      const dummyLineData = [
        { name: "January", absent: 30 },
        { name: "February", absent: 45 },
        { name: "March", absent: 50 },
        { name: "April", absent: 20 },
      ];

      const dummyDatas = [
        { id: 1, label: 'Option 1' },
        { id: 2, label: 'Option 2' },
        { id: 3, label: 'Option 3' },
        { id: 4, label: 'Option 4' },
      ];

  return (
    <div>
        <select
        className='dropbutton'
        id="dropdown"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value="">Select Category</option>
        {dummyDatas.map((option) => (
          <option key={option.id} value={option.label}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="grid-container">
        <div className='home-grid-db'>
          <GridItem title="Today's Expense">
            <DashboardBarGraph data={dummyDetails} />
          </GridItem>
          <GridItem title="Week's Expense">
            <DashboardLineChart data={dummyLineData} />
          </GridItem>
          <GridItem title="Monthly Expense">
            <DashboardBarGraph2 data={dummyDetails} />
          </GridItem>
        </div>
      </div>
    </div>
  );
}

function GridItem({ title, children }) {
  return (
    <div className="grid-item-db">
      <h3 className="grid-item-db-title">{title}</h3>
      {children}
    </div>
  );
}

export default DashBoard;
