import { Link } from 'react-router-dom';
import { formatPrice, formatRating } from '../utils';

export default function GameCard({ game }) {
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
  
  return (
    <div className="col-12 mb-3 mb-md-0 col-md-5 col-lg-4">
      <div className="card game-card shadow-sm h-100">
        <Link to={`/details/games/${game.slug}`} className="position-relative d-flex justify-content-center align-items-center">
          <img 
            src={screenshot} 
            className="card-img-top game-image" 
            alt={`${game.title} Thumbnail`} 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/Genshin-Impact.webp'; // Fallback if image fails to load
            }}
          />
          <span className="position-absolute top-0 end-0 badge bg-dark m-2">{paymentType}</span>
          <span className="position-absolute badge bg-dark p-3">
            <i className="fa-solid fa-play"></i>
          </span>
        </Link>
        <div className="card-body d-flex flex-column">
          <div className="d-flex align-items-center mb-0">
            <Link to={`/details/games/${game.slug}`} className="me-4">
              <img 
                src={iconImage} 
                alt={`${game.title} Logo`} 
                className="img-fluid border border-black rounded" 
                style={{ maxWidth: "60px" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/Genshin-Impact-Icon.webp'; // Fallback if icon fails to load
                }}
              />
            </Link>
            <div className="flex-grow-1">
              <h5 className="card-title game-title fs-6 mb-1">{game.title}</h5>
              <p className="card-text text-muted small mb-2">
                {game.developer}
              </p>
              <div className="d-flex align-items-center">
                <div className="text-warning me-1">
                  {Array.from({ length: Math.floor(game.rating) }).map((_, i) => (
                    <i key={i} className="fa-solid fa-star"></i>
                  ))}
                  {game.rating % 1 >= 0.5 && <i className="fa-solid fa-star-half-alt"></i>}
                </div>
                <small className="text-muted">
                  {formatRating(game.rating)}
                  {game.rating_count !== undefined && (
                    <span> ({game.rating_count})</span>
                  )}
                </small>
              </div>
              {game.download_count !== undefined && (
                <div className="mt-1 small text-muted">
                  <i className="fa-solid fa-download me-1"></i>
                  {game.download_count > 1000000 
                    ? `${Math.floor(game.download_count / 1000000)}M+` 
                    : game.download_count > 1000 
                      ? `${Math.floor(game.download_count / 1000)}K+` 
                      : `${game.download_count}`} downloads
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
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
