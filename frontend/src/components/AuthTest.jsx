import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../store';

const AuthTest = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const testAuth = async () => {
    try {
      setResult(null);
      setError(null);
      
      // Set token explicitly for this request
      const headers = {
        'Authorization': `Bearer ${token}`
      };
      
      const response = await axios.get(`${API_URL}/users/profiles/me/`, { headers });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data || err.message);
      console.error('Auth test error:', err);
    }
  };

  const updateToken = () => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', margin: '20px' }}>
      <h3>Authentication Test</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <label>Current Token:</label>
        <textarea 
          value={token} 
          onChange={(e) => setToken(e.target.value)}
          style={{ width: '100%', height: '80px', marginTop: '5px' }}
        />
        <button onClick={updateToken} style={{ marginTop: '5px' }}>Update Token</button>
      </div>
      
      <button onClick={testAuth}>Test Authentication</button>
      
      {error && (
        <div style={{ marginTop: '15px', color: 'red' }}>
          <h4>Error:</h4>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
      
      {result && (
        <div style={{ marginTop: '15px', color: 'green' }}>
          <h4>Success:</h4>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AuthTest;
