import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import DashboardPieChart from './DashboardPieChart';
import DashboardBarGraph from './DashboardBarGraph';
import DashboardLineChart from './DashboardLineChart';


function DashBoard() {
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

  return (
    <div>
      <div className="grid-container">
        <div className='home-grid-db'>
          <GridItem title="Today's Expense">
            <DashboardBarGraph data={dummyDetails} />
          </GridItem>
          <GridItem title="Monthly Expense">
            <DashboardPieChart data={dummyData} />
          </GridItem>
          <GridItem title="Week's Expense">
            <DashboardLineChart data={dummyLineData} />
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
