import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, formatRating } from '../utils';

export default function GameCardWide({ game }) {
    if (!game || !game.id) {
        return null; // Don't render anything if no valid game data is provided
    }

    // Get the first screenshot from media if available
    const screenshot = game.media && game.media.length > 0 
        ? game.media.find(m => m.media_type === 'screenshot')?.file 
        : '/Genshin-Impact.webp'; // Fallback image

    // Use the game icon if available, otherwise use a fallback
    const iconImage = game.icon || '/Genshin-Impact-Icon.webp';
    
    // Determine if the game is free or paid
    const paymentType = game.price && parseFloat(game.price) > 0 ? formatPrice(game.price) : 'Free';
    
    // Generate category badges based on the game's category
    const categoryName = game.category?.name || '';
    const categoryBadges = categoryName.split(' ').map(cat => cat.trim()).filter(cat => cat !== '');
    
    return (
        <div className="game-card-wide shadow-sm w-100 mb-3 border rounded">
            <div className="row g-2 p-2">
                {/* Left side - Game image */}
                <div className="col-md-4 position-relative">
                    <Link to={`/details/games/${game.slug}`} className="d-block h-100">
                        <img 
                            src={screenshot} 
                            className="img-fluid rounded-start h-100 object-fit-cover w-100" 
                            alt={`${game.title} Thumbnail`} 
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/Genshin-Impact.webp'; // Fallback if image fails to load
                            }}
                        />
                        <span className="position-absolute top-0 end-0 badge bg-dark m-2">{paymentType}</span>
                        <span className="position-absolute top-50 start-50 translate-middle badge bg-dark p-3">
                            <i className="fa-solid fa-play"></i>
                        </span>
                    </Link>
                </div>
                
                {/* Right side - Game details */}
                <div className="col-md-8">
                    <div className="card-body h-100 d-flex flex-column">
                        <div className="d-flex align-items-center mb-3">
                            <Link to={`/details/games/${game.slug}`} className="me-3">
                                <img 
                                    src={iconImage} 
                                    alt={`${game.title} Logo`} 
                                    className="img-fluid border border-black rounded" 
                                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/Genshin-Impact-Icon.webp'; // Fallback if icon fails to load
                                    }}
                                />
                            </Link>
                            <div>
                                <h4 className="card-title game-title mb-1">{game.title}</h4>
                                <p className="card-text text-muted mb-2">{game.developer}</p>
                                <div className="d-flex align-items-center">
                                    <div className="text-warning me-2">
                                        {Array.from({ length: Math.floor(game.rating) }).map((_, i) => (
                                            <i key={i} className="fa-solid fa-star"></i>
                                        ))}
                                        {game.rating % 1 >= 0.5 && <i className="fa-solid fa-star-half-alt"></i>}
                                    </div>
                                    <span className="text-muted">{formatRating(game.rating)}</span>
                                </div>
                            </div>
                        </div>
                        
                        <p className="card-text flex-grow-1">
                            {game.description || 'No description available.'}
                        </p>
                        
                        <div className="mt-auto">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex gap-2">
                                    {categoryName && <span className="badge bg-secondary">{categoryName}</span>}
                                    {game.type && <span className="badge bg-secondary">{game.type}</span>}
                                </div>
                                <Link to={`/details/games/${game.slug}`} className="btn btn-primary">Play Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
