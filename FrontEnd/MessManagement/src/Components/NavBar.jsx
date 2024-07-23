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
        <div className='txt'>R.M.K. GROUP OF INSTITUTIONS</div>
        </a>
      </nav>
      <div className='alig'>
      <h5>GENERAL MANAGER</h5>
        <button className="logout-button">Logout</button>
      </div>
      
    </header>    
  )
}

export default NavBar
