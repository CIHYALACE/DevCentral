import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ActivateAccount() {
  const { uid, token } = useParams();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/auth/users/activate/${uid}/${token}/`, {
          method: 'GET',
        });
        if (response.ok) {
          console.log('Account activated successfully');
        } else {
          console.error('Failed to activate account');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    activateAccount();
  }, [uid, token]);

  return <div>Activating your account...</div>;
};
