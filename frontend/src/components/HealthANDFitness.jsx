// src/layout/HealthFitness.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/healthFitness.css';

const HealthFitness = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const dummyData = [
      {
        id: 5,
        title: 'Yoga for Beginners',
        description: 'Start your fitness journey with basic yoga practices.',
        image: 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg',
        rating: 4.8,
        downloads: '2M+',
        isOwned: true
      },
      {
        id: 6,
        title: 'Healthy Eating Plan',
        description: 'Discover healthy meals and diet tips to stay fit.',
        image: 'https://www.morelandobgyn.com/hs-fs/hubfs/Imported_Blog_Media/GettyImages-854725402-1.jpg?width=600&name=GettyImages-854725402-1.jpg',
        rating: 4.3,
        downloads: '1M+',
        isOwned: false
      },
      {
        id: 7,
        title: 'Home Workout Routines',
        description: 'Simple and effective exercises you can do at home.',
        image: 'https://oldschooltrainer.com/media/posts/40/responsive/micro-workout-home-2xl.webp',
        rating: 4.7,
        downloads: '500K+',
        isOwned: true
      }
    ];
    

    setItems(dummyData);
  }, []);

  return (
    <section className="health-fitness-section">
      <div className="container">
        <h2 className="section-title">Health & Fitness</h2>
        <div className="cards-grid">
          {items.map(item => (
            <Link
              to={`/details/apps/${item.id}`}
              key={item.id}
              className="card-link"
            >
              <div className="card">
                <img src={item.image} alt={item.title} className="card-image" />
                <div className="card-body">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-description">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthFitness;
