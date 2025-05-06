import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../store';

export default function ActivateAccount() {
  const { uid, token } = useParams();
  const [status, setStatus] = useState('Activating your account...');
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/users/activation/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uid,
            token
          })
        });

        if (response.ok) {
          setStatus('Account activated successfully!');
          setTimeout(() => navigate('/login'), 3000);
        } else {
          const data = await response.json();
          setStatus(data.detail || 'Activation failed. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        setStatus('An error occurred during activation.');
      }
    };

    activateAccount();
  }, [uid, token, navigate]);

  return (
    <div className="text-center p-4">
      <h2>{status}</h2>
    </div>
  );
}
