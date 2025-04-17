export default function GameCard() {
    return (
        <>
            <div class="col-6 col-md-5 col-lg-4">
                <div class="card game-card shadow-sm h-100">
                    <a href="#" class="position-relative d-flex justify-content-center align-items-center">
                        <img src="/Genshin-Impact.webp" class="card-img-top game-image" alt="Game Thumbnail" />
                        <span class="position-absolute top-0 end-0 badge bg-dark m-2">In-app</span>
                        <span class="position-absolute badge bg-dark p-3">
                            <i class="fa-solid fa-play"></i>
                        </span>
                    </a>
                    <div class="card-body d-flex flex-column">
                        <div class="d-flex align-items-center mb-0">
                            <a href="#" className="me-4"><img src="/Genshin-Impact-Icon.webp" alt="Game Logo" class="img-fluid border border-black rounded" style={{ maxWidth: "60px" }} /></a>
                            <div class="flex-grow-1">
                                <h5 class="card-title game-title fs-6 mb-1">Epic Adventure Quest</h5>
                                <p class="card-text text-muted small mb-2">Awesome Game Studio</p>
                                <div class="d-flex align-items-center">
                                    <div class="text-warning me-1">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star-half-alt"></i>
                                    </div>
                                    <small class="text-muted">4.2</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}