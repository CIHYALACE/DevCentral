export default function GameCard() {
    return (
        <>
            <div className="col-12 mb-3 mb-md-0 col-md-5 col-lg-4">
                <div className="card game-card shadow-sm h-100">
                    <a href="#" className="position-relative d-flex justify-content-center align-items-center">
                        <img src="/Genshin-Impact.webp" className="card-img-top game-image" alt="Game Thumbnail" />
                        <span className="position-absolute top-0 end-0 badge bg-dark m-2">In-app</span>
                        <span className="position-absolute badge bg-dark p-3">
                            <i className="fa-solid fa-play"></i>
                        </span>
                    </a>
                    <div className="card-body d-flex flex-column">
                        <div className="d-flex align-items-center mb-0">
                            <a href="#" className="me-4"><img src="/Genshin-Impact-Icon.webp" alt="Game Logo" className="img-fluid border border-black rounded" style={{ maxWidth: "60px" }} /></a>
                            <div className="flex-grow-1">
                                <h5 className="card-title game-title fs-6 mb-1">Epic Adventure Quest</h5>
                                <p className="card-text text-muted small mb-2">Awesome Game Studio</p>
                                <div className="d-flex align-items-center">
                                    <div className="text-warning me-1">
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star-half-alt"></i>
                                    </div>
                                    <small className="text-muted">4.2</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}