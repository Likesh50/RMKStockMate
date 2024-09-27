import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import DashboardBarGraph from './DashboardBarGraph';
import DashboardLineChart from './DashboardLineChart';
import DashboardBarGraph2 from './DashboardBarGraph2';
function DashBoard() {
    const [barGraphData, setBarGraphData] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);
    const [lineChartData, setLineChartData] = useState([]);

    // Dummy data
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
    
    // Fetch data for the Bar Graph
    useEffect(() => {
        setBarGraphData(dummyDetails); // Using dummy data for now
    }, []);

    // Fetch data for the Pie Chart
    useEffect(() => {
        setPieChartData(dummyData); // Using dummy data for now
    }, []);

    // Fetch data for the Line Chart
    useEffect(() => {
        fetch('http://localhost:3002/graph/last-7-days')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setLineChartData(data))
            .catch(error => console.error('Error fetching line chart data:', error));
    }, []);
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
                        <DashboardBarGraph data={barGraphData} />
                    </GridItem>
                    <GridItem title="Monthly Expense">
                        <DashboardBarGraph2 data={barGraphData} /> 
                    </GridItem>
                    <GridItem title="Week's Expense">
                        <DashboardLineChart data={lineChartData} />
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
