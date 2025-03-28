import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const [formState, setFormState] = useState({
    Usr_name: '',
    Usr_email: '',
    Usr_phone: '',
    Usr_address: '',
    Usr_pass: '',
    confirmPassword: '',
    role: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formState.role) {
      setError('Please select a role');
      return;
    }

    if (formState.Usr_pass !== formState.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const { confirmPassword, ...formData } = formState;

    try {
      const response = await axios.post(`${backendURL}/api/user/add`, formData);
      console.log('Response from server:', response.data);
      navigate('/login');
    } catch (error) {
      setError('Failed to sign up');
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="max-w-md w-full p-6 bg-white rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        {[
          { label: 'Username', name: 'Usr_name', type: 'text' },
          { label: 'Email', name: 'Usr_email', type: 'email' },
          { label: 'Phone', name: 'Usr_phone', type: 'text' },
          { label: 'Address', name: 'Usr_address', type: 'text' },
          { label: 'Password', name: 'Usr_pass', type: 'password' },
          { label: 'Confirm Password', name: 'confirmPassword', type: 'password' },
        ].map(({ label, name, type }) => (
          <div key={name} className="mb-4 flex items-center">
            <label className="block text-gray-700 w-1/3">{label}:</label>
            <input
              id={name}
              className="w-2/3 px-3 py-2 border rounded"
              type={type}
              name={name}
              value={formState[name]}
              onChange={handleChange}
            />
          </div>
        ))}
        <div className="mb-4 flex items-center">
          <label className="block text-gray-700 w-1/3">Select Role:</label>
          <select
            className="w-2/3 px-3 py-2 border rounded"
            name="role"
            value={formState.role}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="farmer">Farmer</option>
            <option value="governmentOfficial">Government Official</option>
          </select>
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <button
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          type="submit"
        >
          Sign Up
        </button>
        <div className="text-center mt-4">
          Already have an account?{' '}
          <Link className="text-blue-500" to="/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
