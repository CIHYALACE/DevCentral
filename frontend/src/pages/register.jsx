import React, { useState } from 'react';
import '../style/FormStyle.css';
import { Link, useNavigate } from 'react-router-dom';
import img from '../assets/Dev_logo.jpg';
import { register } from '../store';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
    // Clear error when user starts typing again
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      setIsLoading(false);
      return;
    }

    try {
      // Make sure email is properly included
      const registrationData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone_number: formData.phone_number
      };
      
      await register(registrationData);
      setSuccess(true);
      
      // Redirect to login after successful registration
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.detail || 
               err.response?.data?.email?.[0] ||
               err.response?.data?.password?.[0] ||
               err.response?.data?.phone_number?.[0] ||
               'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container my-5">
        <div className="row d-flex align-items-center">
          {/* Image - hidden on small screens */}
          <div className="col-lg-6 d-none d-md-flex justify-content-center mb-4 mb-md-0">
            <img
              className="hero-image rounded img-fluid w-75"
              src={img}
              alt="Hero Animation"
              style={{ height: 'auto' }}
            />
          </div>

          {/* Form */}
          <div className="col-lg-6 col-md-12 col-12">
            <div className="form-container mx-auto">
              <h2>Create Account</h2>
              <h5 className="mb-4 text-muted">
                Welcome to DevCentral! Your one-stop destination for all your app needs.
              </h5>
              
              {/* Success Message */}
              {success && (
                <div className="alert alert-success" role="alert">
                  Registration successful! Redirecting to login...
                </div>
              )}
              
              {/* Error Message */}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <input 
                  name="name" 
                  type="text" 
                  placeholder="Name" 
                  value={formData.name}
                  onChange={handleChange} 
                  required 
                  disabled={isLoading}
                />
                <input 
                  name="email" 
                  type="email" 
                  placeholder="Email" 
                  value={formData.email}
                  onChange={handleChange} 
                  required 
                  disabled={isLoading}
                />
                <input 
                  name="password" 
                  type="password" 
                  placeholder="Password" 
                  value={formData.password}
                  onChange={handleChange} 
                  required 
                  disabled={isLoading}
                />
                <input 
                  name="confirmPassword" 
                  type="password" 
                  placeholder="Confirm Password" 
                  value={formData.confirmPassword}
                  onChange={handleChange} 
                  required 
                  disabled={isLoading}
                />
                <input
                name='phone_number'
                type='text'
                placeholder='Phone Number'
                value={formData.phone_number}
                maxLength={11}
                onChange={handleChange}
                required
                disabled={isLoading}
                />
                
                <button 
                  type="submit" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Registering...' : 'Register'}
                </button>
              </form>
              
              <p className="mt-4 text-muted text-center">
                Already have an account?{" "}
                <Link to="/login" style={{ color: "#a259ff", fontWeight: "bold" }}>
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
