import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ isAuthenticated, setIsAuthenticated }) => {
  const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const [email, setEmail] = useState('');
  const [pass, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (email, pass) => {
    try {
      setIsSubmitting(true);

      const response = await fetch(`${backendURL}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, pass }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      setIsAuthenticated(true); 
    } catch (error) {
      setError('Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email && pass) {
      handleLogin(email, pass);
    } else {
      setError('Please enter both email and password');
    }
  };

  return isAuthenticated ? (
    <Link to='/'></Link>
  ) : (
    <React.Fragment>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form className="bg-white p-6 rounded shadow-md w-full max-w-sm" onSubmit={onSubmit}>
          <h1 className="text-2xl font-bold mb-4 text-center">Login Page</h1>
          <div className='mb-4 flex items-center'>
            <label className='block text-gray-700 w-1/3' htmlFor="email">Email:</label>
            <input
              id="email"
              className='w-2/3 px-3 py-2 border rounded'
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-4 flex items-center'>
            <label className='block text-gray-700 w-1/3' htmlFor="password">Password:</label>
            <input
              id="password"
              className='w-2/3 px-3 py-2 border rounded'
              type="password"
              placeholder="Password"
              value={pass}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <button className={`w-full py-2 px-4 bg-blue-500 text-white rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} type="submit" disabled={isSubmitting}>
              {isSubmitting ? (<div className="loader border-t-2 border-b-2 border-white h-4 w-4 rounded-full animate-spin mx-auto"></div>) : 'Login'}
            </button>
          </div>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          <div className="text-center">
            Don't have an account? <Link className="text-blue-500" to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
