// AppsPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../style/AppsPage.css"; // تأكد أن ملف CSS موجود ومظبوط

const AppsPage = () => {
  // State لتخزين التطبيقات
  const [apps, setApps] = useState([]);
  
  // States إضافية لاستخدامها مع API لاحقًا
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    // داتا وهمية (Dummy Data) مؤقتة لتجربة عرض التطبيقات
    const dummyApps = [
      {
        id: 12,
        title: "WhatsApp Messenger",
        description: "Simple. Secure. Reliable messaging.",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
        rating: 4.5,
        downloads: "5B+",
        isOwned: true
      },
      {
        id: 13,
        title: "Instagram",
        description: "Capture and share the world's moments.",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
        rating: 4.4,
        downloads: "5B+",
        isOwned: true
      },
      {
        id: 14,
        title: "Spotify",
        description: "Listen to music and podcasts for free.",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
        rating: 4.6,
        downloads: "1B+",
        isOwned: false
      },
      {
        id: 15,
        title: "TikTok",
        description: "Short videos for you.",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/0a/TikTok_logo.svg",
        rating: 4.3,
        downloads: "1B+",
        isOwned: false
      },
      {
        id: 16,
        title: "Google Maps",
        description: "Navigate your world faster and easier.",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Google_Maps_icon.svg",
        rating: 4.7,
        downloads: "10B+",
        isOwned: true
      },
      {
        id: 17,
        title: "Zoom",
        description: "Video communications made easy.",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg",
        rating: 4.2,
        downloads: "500M+",
        isOwned: false
      },
      {
        id: 18,
        title: "Snapchat",
        description: "Share the moment!",
        image: "https://upload.wikimedia.org/wikipedia/en/a/ad/Snapchat_logo.svg",
        rating: 4.2,
        downloads: "1B+",
        isOwned: true
      },
      {
        id: 19,
        title: "Microsoft Teams",
        description: "Work together with your team from anywhere.",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
        rating: 4.1,
        downloads: "100M+",
        isOwned: true
      },
      {
        id: 20,
        title: "Facebook",
        description: "Connect with friends and the world around you.",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
        rating: 4.2,
        downloads: "5B+",
        isOwned: true
      },
      {
        id: 21,
        title: "Netflix",
        description: "Watch TV shows and movies anytime, anywhere.",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
        rating: 4.5,
        downloads: "1B+",
        isOwned: true
      }
    ];

    // تعيين الداتا الوهمية في الـ State
    setApps(dummyApps);

    // ✅ لتحميل بيانات حقيقية من API في المستقبل
    /*
    const fetchApps = async () => {
      try {
        const response = await fetch('https://api.example.com/apps'); // استبدل بالرابط الخاص بك
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const data = await response.json();
        setApps(data); // تخزين الداتا القادمة من السيرفر
      } catch (err) {
        setError(err.message); // تخزين الخطأ لو حصل
      } finally {
        setLoading(false); // إنهاء حالة التحميل
      }
    };

    fetchApps();
    */
    
  }, []); // [] = يشغل useEffect مرة واحدة فقط عند التحميل

  // ✅ لو فعلت تحميل البيانات تقدر تعرض لودينج أو خطأ
  /*
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }
  */

  // عرض التطبيقات
  return (
    <section className="apps-page">
      <h2 className="section-title">Popular Apps</h2>

      <div className="apps-grid">
        {apps.map((app) => (
          <Link 
            to={`/details/apps/${app.id}`} // رابط صفحة تفاصيل التطبيق
            key={app.id}
            className="app-card"
          >
            <img src={app.image} alt={app.title} className="app-image" />
            
            <div className="app-info">
              <h3 className="app-title">{app.title}</h3>
              <p className="app-description">{app.description}</p>
              
              <div className="app-details">
                <span className="app-rating">⭐ {app.rating}</span>
                <span className="app-downloads">⬇️ {app.downloads}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AppsPage;
