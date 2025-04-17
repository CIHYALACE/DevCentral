import React from 'react';

export default function GameCardWide() {
    return (
        <div className="card game-card-wide shadow-sm w-100 mb-3">
            <div className="row g-0">
                {/* Left side - Game image */}
                <div className="col-md-4 position-relative">
                    <a href="#" className="d-block h-100">
                        <img src="/Genshin-Impact.webp" className="img-fluid rounded-start h-100 object-fit-cover w-100" alt="Game Thumbnail" />
                        <span className="position-absolute top-0 end-0 badge bg-dark m-2">In-app</span>
                        <span className="position-absolute top-50 start-50 translate-middle badge bg-dark p-3">
                            <i className="fa-solid fa-play"></i>
                        </span>
                    </a>
                </div>
                
                {/* Right side - Game details */}
                <div className="col-md-8">
                    <div className="card-body h-100 d-flex flex-column">
                        <div className="d-flex align-items-center mb-3">
                            <a href="#" className="me-3">
                                <img src="/Genshin-Impact-Icon.webp" alt="Game Logo" className="img-fluid border border-black rounded" style={{ width: "80px", height: "80px", objectFit: "cover" }} />
                            </a>
                            <div>
                                <h4 className="card-title game-title mb-1">Epic Adventure Quest</h4>
                                <p className="card-text text-muted mb-2">Awesome Game Studio</p>
                                <div className="d-flex align-items-center">
                                    <div className="text-warning me-2">
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star-half-alt"></i>
                                    </div>
                                    <span className="text-muted">4.2</span>
                                </div>
                            </div>
                        </div>
                        
                        <p className="card-text flex-grow-1">
                            An epic open-world adventure game where you embark on a journey across vast landscapes, 
                            battle fearsome enemies, and uncover ancient mysteries.
                        </p>
                        
                        <div className="mt-auto">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex gap-2">
                                    <span className="badge bg-secondary">RPG</span>
                                    <span className="badge bg-secondary">Adventure</span>
                                    <span className="badge bg-secondary">Open World</span>
                                </div>
                                <button className="btn btn-primary">Play Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
