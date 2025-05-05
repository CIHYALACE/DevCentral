import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../style/GamesPage.css";
import GameCard from '../components/GameCard';
import { useStore } from "@tanstack/react-store";
import { gameStore, fetchGames } from "../store/gameStore";
import Paginator from '../components/common/Paginator';
import ProgramCard from '../components/ProgramCard';
const GamesPage = () => {
  const { games, loading, error, totalGames, currentPage } = useStore(gameStore);
  const [currentPageState, setCurrentPageState] = useState(1);
  const [itemsPerPage] = useState(12);
  
  useEffect(() => {
    const loadGames = async () => {
      try {
        await fetchGames(currentPageState, itemsPerPage);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };
    
    loadGames();
  }, [currentPageState, itemsPerPage]);

  //   const [loading, setLoading] = useState(true); // حالة لتحميل البيانات
//   const [error, setError] = useState(null); // لحفظ الأخطاء إذا حدثت

  useEffect(() => {
    // الداتا الثابتة (مؤقتًا) لتجربة الكود قبل الاتصال بـ API
    // console.log(asd)
    const dummyData = [
        {
          id: 1,
          title: "Super Mario Odyssey",
          description: "Explore massive 3D kingdoms with Mario in an epic adventure!",
          image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1677740/header.jpg",
          rating: 4.9,
          downloads: "10M+",
          isOwned: true
        },
        {
          id: 2,
          title: "Need for Speed Heat",
          description: "Race by day, risk it all by night in the ultimate street racer fantasy.",
          image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1222680/header.jpg",
          rating: 4.7,
          downloads: "5M+",
          isOwned: true
        },
        {
          id: 3,
          title: "Fortnite",
          description: "Jump into Battle Royale and be the last one standing!",
          image: "https://cdn2.unrealengine.com/fortnite-battle-royale-chapter-4-og-key-art-1920x1080-321f4f741cda.jpg",
          rating: 4.6,
          downloads: "50M+",
          isOwned: false
        },
        {
          id: 4,
          title: "Minecraft",
          description: "Create anything you can imagine in an endless world of blocks.",
          image: "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png",
          rating: 4.8,
          downloads: "200M+",
          isOwned: true
        },
        {
          id: 5,
          title: "Call of Duty: Warzone",
          description: "Fight to survive in a massive battle royale experience.",
          image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/header.jpg",
          rating: 4.7,
          downloads: "100M+",
          isOwned: true
        },
        {
          id: 6,
          title: "Among Us",
          description: "Find the impostor... or be the impostor!",
          image: "https://cdn.cloudflare.steamstatic.com/steam/apps/945360/header.jpg",
          rating: 4.3,
          downloads: "100M+",
          isOwned: true
        },
        {
          id: 7,
          title: "Genshin Impact",
          description: "Explore a vast open world full of magic and adventure.",
          image: "https://cdn2.unrealengine.com/genshin-impact-keyart-1920x1080-1920x1080-073dd6037e3a.jpg",
          rating: 4.7,
          downloads: "50M+",
          isOwned: false
        },
        {
          id: 8,
          title: "Subway Surfers",
          description: "Dash as fast as you can and dodge the oncoming trains!",
          image: "https://upload.wikimedia.org/wikipedia/en/2/2e/Subway_Surfers_app_logo.png",
          rating: 4.5,
          downloads: "2B+",
          isOwned: true
        },
        {
          id: 9,
          title: "Valorant",
          description: "Tactical shooter game full of intense team-based action.",
          image: "https://cdn1.dotesports.com/wp-content/uploads/2020/06/18104742/VALORANT.jpg",
          rating: 4.6,
          downloads: "10M+",
          isOwned: false
        },
        {
          id: 10,
          title: "FIFA 23",
          description: "Experience the thrill of world-class football with FIFA 23.",
          image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/header.jpg",
          rating: 4.2,
          downloads: "20M+",
          isOwned: true
        }
      ]
      
      ;

    // قم بتعيين البيانات الثابتة بشكل مؤقت
    // setGames(dummyData);

    // إذا أردت استخدام API في المستقبل، قم بإلغاء تعليق الكود التالي:
    // const fetchGames = async () => {
    //   try {
    //     const response = await fetch('https://api.example.com/games'); // استبدل هذا الرابط بـ API الخاص بك
    //     if (!response.ok) {
    //       throw new Error('Error fetching data');
    //     }
    //     const data = await response.json();
    //     setGames(data); // تحديث الـ state بالداتا القادمة من الـ API
    //   } catch (err) {
    //     setError(err.message); // إذا كان هناك خطأ في جلب البيانات
    //   } finally {
    //     setLoading(false); // عند انتهاء عملية الجلب، قم بإيقاف حالة التحميل
    //   }
    // };

    // fetchGames();

  }, []); // سيتم تنفيذ هذا الكود مرة واحدة عند تحميل الصفحة

//   if (loading) {
//     return <div className="loading">Loading...</div>; // عرض رسالة تحميل إذا كانت البيانات قيد الجلب
//   }

//   if (error) {
//     return <div className="error">Error: {error}</div>; // عرض الخطأ في حال حدوثه
//   }

  return (
    <section className="games-page">
      <h2 className="section-title">Popular Games</h2>
      
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">
          Error loading games. Please try again later.
        </div>
      ) : games.length === 0 ? (
        <div className="alert alert-info">
          No games available at the moment. Check back later!
        </div>
      ) : (
        <>
          <div className="row g-3">
            {Array.isArray(games) ? 
              games
                .filter((game) => game && game.id)
                .map((game) => (
                  <div key={game.id} className="col-12 mb-3 mb-md-0 col-md-6 col-lg-4">
                    <ProgramCard program={game} />
                  </div>
                ))
              : 
              <div className="alert alert-warning col-12">
                No games data available
              </div>
            }
          </div>
          
          {/* Pagination */}
          <Paginator
            currentPage={currentPageState}
            totalItems={totalGames}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPageState}
          />
        </>
      )}
    </section>
  );
};

export default GamesPage;
