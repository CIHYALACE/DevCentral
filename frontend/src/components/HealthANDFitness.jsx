// src/layout/HealthFitness.jsx
import React, { useEffect, useState } from 'react';
import '../style/healthFitness.css'; // تأكد إن المسار صحيح


const HealthFitness = () => {
  const [items, setItems] = useState([]);

  // مكان تجيب فيه الداتا سواء API أو داتا ثابتة
  useEffect(() => {
    // لحد ما يبقى عندك API، حطينا داتا تجريبية
    const dummyData = [
      {
        id: 1,
        title: 'Yoga for Beginners',
        description: 'Start your fitness journey with basic yoga practices.',
        image: 'https://via.placeholder.com/300x200?text=Yoga',
      },
      {
        id: 2,
        title: 'Healthy Eating Plan',
        description: 'Discover healthy meals and diet tips to stay fit.',
        image: 'https://via.placeholder.com/300x200?text=Healthy+Food',
      },
      {
        id: 3,
        title: 'Home Workout Routines',
        description: 'Simple and effective exercises you can do at home.',
        image: 'https://via.placeholder.com/300x200?text=Workout',
      },
    ];

    setItems(dummyData);
  }, []);

  return (
    <section className="health-fitness-section">
      <div className="container">
        <h2 className="section-title">Health & Fitness</h2>
        <div className="cards-grid">
          {items.map(item => (
            <div key={item.id} className="card">
              <img src={item.image} alt={item.title} className="card-image" />
              <div className="card-body">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthFitness;
