import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/FormStyle.css';
import { Link } from 'react-router-dom';
import { loginUser, setupAxiosInterceptors } from '../utils';
import { authStore } from '../store';
import img from '../assets/Dev_logo.jpg';

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setupAxiosInterceptors();

    const token = localStorage.getItem('token');
    if (token && authStore.state.user.token) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
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
    <>
      <div className="container my-5">
  <div className="row align-items-center">
    {/* Image Column - Hidden on small screens */}
    <div className="col-lg-6 d-none d-md-flex justify-content-center mb-4 mb-md-0">
      <img
        className="hero-image rounded img-fluid w-75"
        src={img}
        alt="Hero Animation"
        style={{ height: 'auto' }}
      />
    </div>

    {/* Form Column - Full width on small screens */}
    <div className="col-lg-6 col-md-12 col-12">
      <div className="form-container mx-auto">
        <h2>Login</h2>
        <h5 className="mb-4 text-muted">
          Welcome back to DevCentral! Your one-stop destination for all your needs.
        </h5>
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
        <p className="mt-4 text-muted text-center">
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#a259ff', fontWeight: 'bold' }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default Login;
