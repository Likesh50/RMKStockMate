import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css'
import LoginPage from './Components/LoginPage'
import Layout from "./Components/Layout";
import Dispatch from "./Components/Dispatch";
import Purchase from "./Components/Purchase.jsx";
import AvailableStock from "./Components/AvailableStock.jsx";
import Reports from "./Components/Reports.jsx";
import AddItems from "./Components/AddItems.jsx";
import { MonthlyReport } from "./Components/MonthlyReport.jsx";
import PrintMonthlyReport from "./Components/PrintMonthlyReport.jsx";
import PrintCategoryReport from "./Components/PrintCategoryReport.jsx";



function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
function App() {

  return (
    <div className='app'>
      <Router>
          <ScrollToTop />
          <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path="/dashboard/*" element={<Layout/>}>
              <Route index element={<Purchase/>} />
              <Route path="dispatch" element={<Dispatch/>} />
              <Route path="available" element={<AvailableStock/>} />
              <Route path="reports" element={<Reports/>} />
              <Route path="add" element={<AddItems/>} />
              <Route path="reports/monthly" element={<PrintMonthlyReport/>} />
              <Route path="reports/category-wise" element={<PrintCategoryReport />} />

          </Route>
          </Routes>
      </Router>

    </div>
  )
}

export default App
