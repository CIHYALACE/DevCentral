// AppsPage.jsx

import React, { useState, useEffect } from 'react';
import AppCard from '../components/AppCard'; // ✅ استيراد كومبوننت AppCard

const AppsPage = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const dummyApps = [
      {
        id: 12,
        name: "WhatsApp Messenger",
        description: "Simple. Secure. Reliable messaging.",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
        rating: 4.5,
        downloads: "5B+",
        isOwned: true,
        price: 0
      },
      {
        id: 13,
        name: "Instagram",
        description: "Capture and share the world's moments.",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg",
        rating: 4.4,
        downloads: "5B+",
        isOwned: true,
        price: 0
      },
      {
        id: 14,
        name: "Spotify",
        description: "Listen to music and podcasts for free.",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
        rating: 4.6,
        downloads: "1B+",
        isOwned: false,
        price: 0
      },
      {
        id: 15,
        name: "TikTok",
        description: "Short videos for you.",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/0a/TikTok_logo.svg",
        rating: 4.3,
        downloads: "1B+",
        isOwned: false,
        price: 0
      },
      {
        id: 16,
        name: "Google Maps",
        description: "Navigate your world faster and easier.",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Google_Maps_icon.svg",
        rating: 4.7,
        downloads: "10B+",
        isOwned: true,
        price: 0
      },
      {
        id: 17,
        name: "Zoom",
        description: "Video communications made easy.",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg",
        rating: 4.2,
        downloads: "500M+",
        isOwned: false,
        price: 0
      },
      {
        id: 18,
        name: "Snapchat",
        description: "Share the moment!",
        image: "https://upload.wikimedia.org/wikipedia/en/a/ad/Snapchat_logo.svg",
        rating: 4.2,
        downloads: "1B+",
        isOwned: true,
        price: 0
      },
      {
        id: 19,
        name: "Microsoft Teams",
        description: "Work together with your team from anywhere.",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
        rating: 4.1,
        downloads: "100M+",
        isOwned: true,
        price: 0
      },
      {
        id: 20,
        name: "Facebook",
        description: "Connect with friends and the world around you.",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
        rating: 4.2,
        downloads: "5B+",
        isOwned: true,
        price: 0
      },
      {
        id: 21,
        name: "Netflix",
        description: "Watch TV shows and movies anytime, anywhere.",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
        rating: 4.5,
        downloads: "1B+",
        isOwned: true,
        price: 0
      }
    ];

    setApps(dummyApps);
  }, []);

  return (
    <section className="apps-page">
      <h2 className="section-title">Popular Apps</h2>

      <div className="apps-grid">
        {apps.map((app) => (
          <AppCard app={app} key={app.id} />
        ))}
      </div>
    </section>
  );
};

export default AppsPage;
