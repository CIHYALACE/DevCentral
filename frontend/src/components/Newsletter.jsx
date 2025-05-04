import React from 'react';
import img from '../assets/sletter.png';
import '../style/Newsletter.css'; 

export function Newsletter() {
  return (
    <section className="newsletter-container container py-5 mb-5">
      <div className="row align-items-center">
        {/* Image - Hidden on small screens */}
        <div className="col-md-6 d-none d-md-flex justify-content-center">
          <img
            src={img}
            alt="Newsletter"
            className="img-fluid rounded w-75"
          />
        </div>

        {/* Text + Form */}
        <div className="col-md-6 col-12 text-center text-md-start">
          <h2 className="newsletter-title mb-3">Subscribe to our <br /> Newsletter</h2>
          <p className="text-muted mb-4">Stay up to date with the latest updates and exclusive offers.</p>
          <form className="newsletter-form d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-md-start">
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                required
                aria-label="Email Address"
              />
            </div>
            <button type="submit" className="btn btn-subscribe">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
