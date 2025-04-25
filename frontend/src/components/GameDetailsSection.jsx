import React from "react";
import img1 from "../assets/unnamed.webp"
import img2 from "../assets/unnamed (1).webp"
import img3 from "../assets/unnamed (2).webp"
import img4 from "../assets/unnamed (3).webp"
const GameDetailCard = () => {
  return (
    <div className="container my-5 text-light bg-dark p-4 rounded shadow-lg">
      {/* Header */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <img
          src={img1}
          alt="Game Thumbnail"
          className="rounded-4 shadow"
          style={{ width: "120px", height: "120px", objectFit: "cover" }}
        />
        <div className="flex-grow-1">
          <h2 className="mb-1">Game Title</h2>
          <p className="text-secondary mb-1">Game Developer</p>
          <p className="text-muted">★ 4.5 (10k reviews)</p>
        </div>
      </div>

      {/* Screenshots */}
      <div className="d-flex gap-3 mb-4">
        <img src={img2} alt="Screenshot 1" className="rounded img-fluid shadow-sm" style={{ width: "32%" }} />
        <img src={img3} alt="Screenshot 2" className="rounded img-fluid shadow-sm" style={{ width: "32%" }} />
        <img src={img4} alt="Screenshot 3" className="rounded img-fluid shadow-sm" style={{ width: "32%" }} />
      </div>

      {/* Description */}
      <p className="text-light mb-4">
        This is a brief description of the game. It gives players an idea of the storyline, gameplay, and what makes it unique.
      </p>

      {/* Additional Info */}
      <div className="mb-4">
        <p><strong>Genre:</strong> Action, Adventure</p>
        <p><strong>Downloads:</strong> 1M+</p>
        <p><strong>Last Updated:</strong> April 2025</p>
      </div>

      {/* Play on PC Section */}
      <div className="bg-secondary p-3 rounded">
        <h4 className="text-white">Play on PC</h4>
        <ul className="mt-2 ps-4">
          <li>Official Google experience</li>
          <li>Bigger screen</li>
          <li>Improved controls</li>
          <li>Seamless sync across devices</li>
          <li>Earn Google Play Points</li>
        </ul>
      </div>
    </div>
  );
};

export default GameDetailCard;
