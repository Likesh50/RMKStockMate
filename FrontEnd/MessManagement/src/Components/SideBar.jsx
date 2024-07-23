import React, { useState, useEffect, useRef } from 'react';
import './SideBar.css';
import { Link, useLocation } from 'react-router-dom';
import front from '../assets/Front.jpg';
import purchase from '../assets/purchase.png'
import dispatch from '../assets/dispatch.png'
import Available from '../assets/Available.png'
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
      </ul>
    </div>
  );
}

export default SideBar;