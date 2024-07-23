import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/Logo.png';
import backgroundImage from '../assets/Front.jpg';

const PageWrapper = styled.div`
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100vh; 
`;

const LoginForm = styled.div`
  position: absolute;
  top: 50%;
  left: 20%;
  transform: translate(-50%, -50%);
  background-color: rgba(244, 244, 244, 0.9);
  padding: 60px 30px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  max-width: 90%;
`;

const FlowerLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const LogoImage = styled.img`
  width: 200px;
  height: 100px;
  border-radius: 20px;
  background-color: transparent;
  margin-bottom: 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  background-color: #1e620a;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 33%;
`;

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
    <PageWrapper>
      <LoginForm>
        <FlowerLogo>
          <LogoImage src={logo} alt="Logo" />
        </FlowerLogo>
        <form>
          <FormGroup>
            <Input
              type="text"
              id="username"
              placeholder="USERNAME"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-label="Username"
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              id="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
            />
          </FormGroup>
          <SubmitButton type="submit">Sign in</SubmitButton>
        </form>
      </LoginForm>
    </PageWrapper>
  );
}

export default LoginPage;
