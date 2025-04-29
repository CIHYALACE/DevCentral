import GameCard from "./GameCard";
import GameCardWide from "./GameCardWide";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import { gameStore, fetchGames } from "../store/gameStore";
import { useStore } from "@tanstack/react-store";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function GamesSection() {
  // Get games directly from the gameStore
  const { games: storeGames, loading: storeLoading } = useStore(gameStore);
  const [loading, setLoading] = useState(true);
  
  // Ensure games is always an array
  const games = Array.isArray(storeGames) ? storeGames : [];
  
  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      try {
        // Fetch games with the game store
        await fetchGames(1, 10);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadGames();
  }, []);

  // Show loading state if either local loading or store loading is true
  if (loading || storeLoading) {
    return (
      <div className="container py-5 z-0">
        <h2 className="mb-4">Popular Games</h2>
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  // If no games are found, show placeholder message
  if (games.length === 0) {
    return (
      <div className="container py-5 z-0">
        <h2 className="mb-4">Popular Games</h2>
        <p>No games available at the moment. Check back later!</p>
      </div>
    );
  }

  // Get the featured games (limited to 6 for the slider)
  const featuredGames = games.slice(0, Math.min(6, games.length));
  
  // Get the top 3 games for the bottom section
  const topGames = games.slice(0, Math.min(3, games.length));

  return (
    <div className="container py-5 z-0">
      <h2 className="mb-4">Popular Games</h2>

      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="games-swiper"
      >
        {featuredGames.map((game) => (
          <SwiperSlide key={game.id || Math.random()}>
            <GameCardWide game={game} />
          </SwiperSlide>
        ))}
      </Swiper>
      <hr />
      <h2 className="mb-4">Featured Games</h2>
      {games.length > 0 && <GameCardWide game={games[0]} />}
      <div className="row">
        {topGames.map((game) => (
          <GameCard key={game.id || Math.random()} game={game} />
        ))}
      </div>
    </div>
  );
}
