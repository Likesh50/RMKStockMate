import React from 'react'
import './NavBar.css'
import logo from '../assets/RMK.png'
import './NavBar.css'
function NavBar() {

  return (
      <header className='header'>
      <nav className='left'>
        <img src={logo} width="50px" height="70px" alt="Logo" />
        <a href='/dashboard' className='logo' style={{ textDecoration: 'none' }}>
        <div>R.M.K. Engineering College</div>
        <div className='cls'>(AN AUTONOMOUS INSTITUTE)</div>
        </a>
      </nav>
      <div className='alig'>
        <button className="logout-button">Logout</button>
      </div>
      
    </header>    
  )
}

export default NavBar
