import React, { useState, useEffect } from 'react';
import { useStore } from "@tanstack/react-store";
import { gameStore, fetchGames } from "../store/gameStore";
import Paginator from '../components/common/Paginator';
import ProgramCard from '../components/ProgramCard';

const GamesPage = () => {
  const { games, loading, error, totalGames } = useStore(gameStore);
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

  return (
    <section className="games-page py-5">
      <div className="container">
        <h2 className="section-title text-center mb-4">Popular Games</h2>
        
        {loading ? (
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center">
            Error loading games. Please try again later.
          </div>
        ) : games.length === 0 ? (
          <div className="alert alert-info text-center">
            No games available at the moment. Check back later!
          </div>
        ) : (
          <>
            <div className="row g-4">
              {Array.isArray(games) ? 
                games
                  .filter((game) => game && game.id)
                  .map((game) => (
                    <div key={game.id} className="col-12 col-sm-6 col-lg-3">
                      <ProgramCard program={game} />
                    </div>
                  ))
                : 
                <div className="alert alert-warning col-12 text-center">
                  No games data available
                </div>
              }
            </div>
            
            {/* Pagination */}
            <div className="mt-5 d-flex justify-content-center">
              <Paginator
                currentPage={currentPageState}
                totalItems={totalGames}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPageState}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default GamesPage;
