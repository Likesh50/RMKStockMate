import React, { useState } from 'react';
import logo from '../assets/Logo.png';
import front from '../assets/Front.jpg'
import './LoginPage.css'
function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='loginpage'>
      <div className="login-form">
        <div className="flower-logo">
          <img src={logo} alt="Logo" />
        </div>
        <form>
          <div className="form-group">
            <input
              type="text"
              id="username"
              placeholder="USERNAME"
              value={username}
              aria-label="Username"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              placeholder="PASSWORD"
              value={password}
              aria-label="Password"
            />
          </div>
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
