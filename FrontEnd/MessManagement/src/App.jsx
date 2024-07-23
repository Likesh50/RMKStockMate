import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css'
import LoginPage from './Components/LoginPage'
import Layout from "./Components/Layout";
import ItemTable from './Components/ItemTable';
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
              <Route index element={<ItemTable/>} />
          </Route>
          </Routes>
      </Router>

    </div>
  )
}

export default App
