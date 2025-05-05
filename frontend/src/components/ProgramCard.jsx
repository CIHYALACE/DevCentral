import React from "react";
import { Link } from "react-router-dom";
import { formatPrice, formatRating } from "../utils";
import { Button } from "react-bootstrap";

const ProgramCard = ({ program, showEditButton = false }) => {
  // Don't render if no valid program data
  if (!program?.id) return null;

  // Extract and prepare data
  const title = program.title || "Unknown Program";
  const developer = program.developer?.split("@")[0] || "Unknown Developer";
  const route = `/details/${program.type?.toLowerCase() || "apps"}/${
    program.slug
  }`;
  const price = program.price > 0 ? formatPrice(program.price) : "Free";
  const icon = program.icon || "/Genshin-Impact-Icon.webp";
  const screenshot =
    program.media?.find((m) => m.media_type === "screenshot")?.file ||
    "/Genshin-Impact.webp";

  // Format download count
  let downloads = "0";
  if (program.download_count) {
    if (program.download_count >= 1000000) {
      downloads = `${Math.floor(program.download_count / 1000000)}M+`;
    } else if (program.download_count >= 1000) {
      downloads = `${Math.floor(program.download_count / 1000)}K+`;
    } else {
      downloads = program.download_count.toString();
    }
  }

  return (
    <div className="h-100">
      <div className="card shadow-sm h-100">
        {/* Screenshot - Fixed aspect ratio container */}
        <Link to={route} className="position-relative screenshot-container" style={{ paddingBottom: '56.25%', overflow: 'hidden', display: 'block' }}>
          <img
            src={screenshot}
            className="card-img-top position-absolute w-100 h-100"
            style={{ objectFit: 'cover', top: 0, left: 0 }}
            alt={title}
            onError={(e) => {
              e.target.src = "/Genshin-Impact.webp";
            }}
          />
          <span className="position-absolute top-0 end-0 badge bg-dark m-2">
            {price}
          </span>
          <span className="position-absolute top-50 start-50 badge bg-dark p-2">
            <i className="fa-solid fa-play"></i>
          </span>
        </Link>

        {/* Content */}
        <div className="card-body">
          <div className="d-flex position-relative">
            {/* Icon - Fixed size container */}
            <Link to={route} className="me-3 flex-shrink-0">
              <div style={{ width: "50px", height: "50px", overflow: 'hidden', position: 'relative' }} className="rounded border">
                <img
                  src={icon}
                  className="position-absolute w-100 h-100"
                  style={{ objectFit: "cover", top: 0, left: 0 }}
                  alt={`${title} icon`}
                  onError={(e) => {
                    e.target.src = "/Genshin-Impact-Icon.webp";
                  }}
                />
              </div>
            </Link>

            {/* Details - Allow to grow and shrink */}
            <div className="flex-grow-1 min-width-0">
              <h5 className="card-title mb-1 fs-6 text-truncate">{title}</h5>
              <p className="text-muted small mb-1 text-truncate">{developer}</p>

              {/* Rating */}
              {program.rating && (
                <div className="d-flex align-items-center">
                  <div className="text-warning me-1">
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <small className="text-muted text-truncate">
                    {formatRating(program.rating)}
                    {program.rating_count && (
                      <span> ({program.rating_count})</span>
                    )}
                  </small>
                </div>
              )}

              {/* Downloads */}
              {downloads && (
                <div className="small text-muted mt-1">
                  <i className="fa-solid fa-download me-1"></i>
                  {downloads} downloads
                </div>
              )}

              {/* Categories */}
              {(program.category?.name || program.type) && (
                <div className="mt-2">
                  {program.category?.name && (
                    <span className="badge bg-secondary me-1">
                      {program.category.name}
                    </span>
                  )}
                  {program.type && (
                    <span className="badge bg-secondary">{program.type}</span>
                  )}
                </div>
              )}
            </div>
            
            {/* Edit Button - Positioned absolutely to the right */}
            {showEditButton && (
              <div className="position-absolute top-0 end-0">
                <Link 
                  to={`/profile/edit-program/${program.slug}`} 
                  className="btn btn-sm btn-outline-primary"
                >
                  <i className="fa-solid fa-edit me-1"></i>
                  Edit
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
