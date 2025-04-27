import { Link } from 'react-router-dom';

export default function GameCard() {

  let game = {
    id: 1,
    title: "Epic Adventure Quest",
    image: "/Genshin-Impact.webp",
    icon: "/Genshin-Impact-Icon.webp",
    studio: "Awesome Game Studio",
    rating: 4.9,
    payment:"In-app",
  };

    return (
        <>
            <div className="col-12 mb-3 mb-md-0 col-md-5 col-lg-4">
                <div className="card game-card shadow-sm h-100">
                    <a href="#" className="position-relative d-flex justify-content-center align-items-center">
                        <img src="/Genshin-Impact.webp" className="card-img-top game-image" alt="Game Thumbnail" />
                        <span className="position-absolute top-0 end-0 badge bg-dark m-2"> {game.payment} </span>
                        <span className="position-absolute badge bg-dark p-3">
                            <i className="fa-solid fa-play"></i>
                        </span>
                    </a>
                    <div className="card-body d-flex flex-column">
                        <div className="d-flex align-items-center mb-0">
                            <Link to={`/details/games/${game.id}`} className="me-4"><img src="/Genshin-Impact-Icon.webp" alt="Game Logo" className="img-fluid border border-black rounded" style={{ maxWidth: "60px" }} /></Link>
                            <div className="flex-grow-1">
                                <h5 className="card-title game-title fs-6 mb-1"> {game.title} </h5>
                                <p className="card-text text-muted small mb-2"> {game.studio} </p>
                                <div className="d-flex align-items-center">
                                    <div className="text-warning me-1">
                                        <i className="fa-solid fa-star"></i>
                                    </div>
                                    <small className="text-muted"> {game.rating} </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


// import { Link } from 'react-router-dom';

// export default function GameCard({game }) {

//     if (!game || !game.id) {
//         return null; // لا تعرض أي شيء إذا كانت البيانات غير صالحة
//       }
    
//   return (
//     <div className="col-12 mb-3 mb-md-0 col-md-5 col-lg-4">
//       <div className="card game-card shadow-sm h-100">
//         <Link to={`/details/games/${game.slug}`} className="position-relative d-flex justify-content-center align-items-center">
//           <img src={game?.media?.find((media) => media.media_type === 'screenshot')?.file} className="card-img-top game-image" alt="Game Thumbnail" />
//           <span className="position-absolute top-0 end-0 badge bg-dark m-2">In-app</span>
//           <span className="position-absolute badge bg-dark p-3">
//             <i className="fa-solid fa-play"></i>
//           </span>
//         </Link>
//         <div className="card-body d-flex flex-column">
//           <div className="d-flex align-items-center mb-0">
//             <Link to={`/details/games/${game.id}`} className="me-4">
//               <img src={game.icon} alt="Game Logo" className="img-fluid border border-black rounded" style={{ maxWidth: "60px" }} />
//             </Link>
//             <div className="flex-grow-1">
//               <h5 className="card-title game-title fs-6 mb-1">{game.title}</h5>
//               <p className="card-text text-muted small mb-2">{game.studio}</p>
//               <div className="d-flex align-items-center">
//                 <div className="text-warning me-1">
//                   {Array.from({ length: Math.floor(game.rating) }).map((_, index) => (
//                     <i key={index} className="fa-solid fa-star"></i>
//                   ))}
//                   {game.rating % 1 !== 0 && <i className="fa-solid fa-star-half-alt"></i>}
//                 </div>
//                 <small className="text-muted">{game.rating}</small>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
