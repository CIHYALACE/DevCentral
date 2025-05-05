import React, { useState } from 'react';
import '../style/FormStyle.css';
import { Link } from 'react-router-dom';
import img from '../assets/Dev_logo.jpg';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' // default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    localStorage.setItem('user', JSON.stringify(formData));
    alert(`Account Created Successfully as ${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}!`);
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
          <form onSubmit={handleSubmit}>
            <input 
              name="username" 
              type="text" 
              placeholder="Username" 
              onChange={handleChange} 
              required 
            />
            <input 
              name="email" 
              type="email" 
              placeholder="Email" 
              onChange={handleChange} 
              required 
            />
            <input 
              name="password" 
              type="password" 
              placeholder="Password" 
              onChange={handleChange} 
              required 
            />
            <input 
              name="confirmPassword" 
              type="password" 
              placeholder="Confirm Password" 
              onChange={handleChange} 
              required 
            />
            <select 
              name="role" 
              value={formData.role} 
              onChange={handleChange} 
              required
            >
              <option value="user">User</option>
              <option value="developer">Developer</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit">Register</button>
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
