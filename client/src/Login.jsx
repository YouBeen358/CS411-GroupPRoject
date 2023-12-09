import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    console.log('Login credentials:', { email, password });

    axios.post('http://localhost:3001/login', { email, password })
      .then(result => {
        if (result.data.success) {
          const user = result.data.user;
          console.log(user);
          navigate('/home', { state: { user } });
        } else {

          setErrorMessage(result.data.message || 'Login failed. Please check your credentials and try again.');
        }
      })
      .catch(error => {
        console.log(error);
        setErrorMessage('An error occurred. Please try again later.');
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <button type="submit" className="btn btn-success w-100 rounded-0" style={{ backgroundColor: 'pink', border: 'none' }}>
            Login
          </button>
          <p>
            Don't have an account?
            <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
