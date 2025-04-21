// src/components/EducationalAppsSection.jsx
import React, { useState, useEffect } from 'react';
import "../style/EducationalAppsSection.css";
import { Link } from "react-router-dom"; // خلي بالك تضيفه فوق


const EducationalAppsSection = () => {
  const [educationalApps, setEducationalApps] = useState([]);

  useEffect(() => {
    // مؤقتاً داتا ثابتة
    const fetchEducationalApps = async () => {
      const dummyEducationalApps = [
        {
            id: 1,
            title: 'Learn Languages',
            description: 'Improve your language skills with fun interactive lessons.',
            image: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
          },
          {
            id: 2,
            title: 'Math Master',
            description: 'Challenge yourself with math quizzes and games.',
            image: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
          },
          {
            id: 3,
            title: 'Science Explorer',
            description: 'Discover the world of science through experiments and videos.',
            image: 'https://images.pexels.com/photos/256302/pexels-photo-256302.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
          },
          {
            id: 4,
            title: 'History Adventures',
            description: 'Travel through time and learn about historical events.',
            image: 'https://images.pexels.com/photos/3889860/pexels-photo-3889860.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
          },
      ];

      setEducationalApps(dummyEducationalApps);
    };

    fetchEducationalApps();
  }, []);

  return (
    <section className="educational-apps">
      <h2 className="section-title">Educational Apps</h2>
      <div className="apps-grid">
        {educationalApps.map((app) => (
          <Link 
            to={`/details/apps/${app.id}`} 
            key={app.id} 
            className="app-card"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <img src={app.image} alt={app.title} className="app-image" />
            <div className="app-info">
              <h3 className="app-name">{app.title}</h3>
              <p className="app-description">{app.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default EducationalAppsSection;
