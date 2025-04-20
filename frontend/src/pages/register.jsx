import React, { useState } from 'react';
import '../style/FormStyle.css'; // ضيف الاستايل هنا
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    localStorage.setItem('user', JSON.stringify(formData));
    alert('Account Created Successfully!');
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
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
        <button type="submit">Register</button>
      </form>
      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
