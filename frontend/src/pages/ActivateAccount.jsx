import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ActivateAccount() {
  const { uid, token } = useParams();
  const [status, setStatus] = useState('Activating your account...');
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        // Match the URL structure from CustomActivationEmail
        const response = await fetch(`http://127.0.0.1:8000/api/users/activation/`, {
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
          setStatus('Activation failed. Please try again.');
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
