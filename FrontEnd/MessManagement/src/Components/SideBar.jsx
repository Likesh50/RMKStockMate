import React, { useState, useEffect, useRef } from 'react';
import './SideBar.css';
import { Link, useLocation } from 'react-router-dom';
import purchase from '../assets/purchase.png'
import dispatch from '../assets/dispatch.png'
import Available from '../assets/Available.png'
import reports from '../assets/reports.png'
import add from '../assets/add.png'
import menu from '../assets/menu.png'
import view from '../assets/view.png'
function SideBar() {

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
      };
  return (
    <div className="sidebar">
      <ul>
      <li className={isActive('/purchase')}>
          <Link to="purchase">
            <img src={purchase} width="40px" height="40px" alt="Faculty Details" />
            Purchase
          </Link>
        </li>
        <li className={isActive('/purchase')}>
          <Link to="purchase">
            <img src={dispatch} width="60px" height="40px" alt="Mail" />
            Dispatch
          </Link>
        </li>
        <li className={isActive('/purchase')}>
          <Link to="purchase">
            <img src={Available} width="40px" height="40px" alt="other forms" />
            Available Stock
          </Link>
        </li>
        <li className={isActive('/purchase')}>
          <Link to="purchase">
            <img src={reports} width="40px" height="40px" alt="other forms" />
            Reports
          </Link>
        </li>
        <li className={isActive('/purchase')}>
          <Link to="purchase">
            <img src={add} width="40px" height="40px" alt="other forms" />
            Add Items
          </Link>
        </li>
        <li className={isActive('/purchase')}>
          <Link to="purchase">
            <img src={menu} width="40px" height="40px" alt="other forms" />
            Add Event menu
          </Link>
        </li>
        <li className={isActive('/purchase')}>
          <Link to="purchase">
            <img src={view} width="40px" height="40px" alt="other forms" />
            View Event menu
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;