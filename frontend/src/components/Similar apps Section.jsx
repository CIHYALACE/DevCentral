// src/components/SimilarAppsSection.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // لتوجيه المستخدم إلى تفاصيل التطبيق
import "../style/SimilarAppsSection.css"; // تأكد من إضافة ملف CSS الخاص بك

// بيانات التطبيقات المشابهة
const similarAppsData = [
  {
    id: 1,
    title: 'Language Master',
    description: 'Learn new languages with fun games and interactive lessons.',
    image: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    rating: 4.6,
    downloads: '2M+'
  },
  {
    id: 2,
    title: 'Math Genius',
    description: 'Challenge yourself with math puzzles and quizzes.',
    image: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    rating: 4.4,
    downloads: '1M+'
  },
  {
    id: 3,
    title: 'Science Academy',
    description: 'Explore the world of science with interactive experiments and videos.',
    image: 'https://images.pexels.com/photos/256302/pexels-photo-256302.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    rating: 4.7,
    downloads: '3M+'
  },
  {
    id: 4,
    title: 'History Explorer',
    description: 'Learn about the world’s history through engaging lessons.',
    image: 'https://images.pexels.com/photos/3889860/pexels-photo-3889860.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    rating: 4.3,
    downloads: '1.5M+'
  }
];

const SimilarAppsSection = () => {
return (
    <section className="similar-apps">
        <h2 className="section-title">Similar Apps</h2>
        <div className="apps-grid">
            {similarAppsData.map((app) => (
                <Link to={`/details/apps/${app.id}`} key={app.id} className="app-card">
                    <div className="card">
                        <img src={app.image} alt={app.title} className="app-image" />
                        <div className="card-body">
                            <h3 className="app-title">{app.title}</h3>
                            <p className="app-description">
                                {app.description.split(' ').slice(0, 4).join(' ')}...
                            </p>
                            <div className="app-footer">
                                <span className="app-rating">{app.rating}⭐</span>
                                <span className="app-downloads">{app.downloads}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </section>
);
};

export default SimilarAppsSection;
