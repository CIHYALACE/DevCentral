// pages/MyPrograms.jsx
import React, { useEffect, useState } from 'react';
import ProgramCard from '../components/ProgramCard';
import { Link } from 'react-router-dom';
import '../style/MyPrograms.css'; // استدعاء ملف CSS

const MyPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/usingViewset/myprograms/?mine=true', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPrograms(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching programs:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="my-programs-container">
      <div className="my-programs-header">
        <h1>My Programs</h1>
        <Link to="/profile/add-program" className="add-button">+ Add New One</Link>

      </div>

      {loading ? (
        <p>Loading.........</p>
      ) : programs.length === 0 ? (
        <p>Sorry you have no programs</p>
      ) : (
        <div className="programs-grid">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPrograms;
