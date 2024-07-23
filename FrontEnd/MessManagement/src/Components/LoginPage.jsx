import React, { useState } from 'react';
import logo from '../assets/Logo.png';
import './LoginPage.css';
function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if ((username === 'ADMIN' || username === 'admin') && password === 'selva') {
      alert('Login successful');
    } else {
      alert("Invalid username or assword");
      setError('Invalid username or password');
    }
  };

  return (
    <div className='loginpage'> 
      <div className="login-form">
        <div className="flower-logo">
          <img src={logo} alt="Logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="username"
              placeholder="USERNAME"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-label="Username"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
