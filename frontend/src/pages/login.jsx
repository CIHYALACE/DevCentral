import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/FormStyle.css';
import { Link } from 'react-router-dom';
import { loginUser, setupAxiosInterceptors } from '../utils';
import { authStore } from '../store';

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Setup axios interceptors for authentication
  useEffect(() => {
    setupAxiosInterceptors();
    
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token && authStore.state.user.token) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setLoginData({...loginData, [e.target.name]: e.target.value });
    // Clear error when user starts typing again
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const result = await loginUser(loginData.email, loginData.password);
      
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error.detail || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="form-container">
      <h2>Login</h2>
      {error && (
        <div className="error-message" style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input 
          name="email" 
          type="email" 
          placeholder="Email" 
          onChange={handleChange} 
          value={loginData.email}
          disabled={loading}
          required 
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          onChange={handleChange} 
          value={loginData.password}
          disabled={loading}
          required 
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
