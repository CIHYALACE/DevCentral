import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/FormStyle.css'; // ضيف الاستايل هنا
import { Link } from 'react-router-dom'; // خد بالك ضيفت Link


const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setLoginData({...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem('user'));

    if (savedUser && savedUser.email === loginData.email && savedUser.password === loginData.password) {
      alert('Login Successful');
      localStorage.setItem('isLoggedIn', true);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
