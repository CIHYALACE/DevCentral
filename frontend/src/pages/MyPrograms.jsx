// pages/MyPrograms.jsx
import React, { useEffect, useState } from 'react';
import ProgramCard from '../components/ProgramCard';

const MyPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/usingViewset/myprograms/?mine=true', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`, // تأكد إنك مسجل دخول
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">برامجي</h1>
      {loading ? (
        <p>جاري التحميل...</p>
      ) : programs.length === 0 ? (
        <p>لا توجد برامج بعد.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPrograms;
