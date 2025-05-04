export default function Footer() {
  return (
    <footer
      id="contact-section"
      className="pt-5 border-top text-dark"
      // style={{ backgroundColor: "#f9f6ff" }}
      aria-label="Site footer"
    >
      <div className="container">
        <div className="row text-center text-md-start">

          {/* DevCentral */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold" style={{ color: "#a259ff" }}>DevCentral</h5>
            <ul className="list-unstyled">
              <li><a href="#!" className="text-dark text-decoration-none d-block mb-1">DevCentral Premium</a></li>
              <li><a href="#!" className="text-dark text-decoration-none d-block mb-1">Gift Cards</a></li>
              <li><a href="#!" className="text-dark text-decoration-none d-block mb-1">Redeem</a></li>
              <li><a href="#!" className="text-dark text-decoration-none d-block">Refund Policy</a></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold" style={{ color: "#a259ff" }}>Useful Links</h5>
            <ul className="list-unstyled">
              <li><a href="#!" className="text-dark text-decoration-none d-block mb-1">Home</a></li>
              <li><a href="#!" className="text-dark text-decoration-none d-block mb-1">About</a></li>
              <li><a href="#!" className="text-dark text-decoration-none d-block mb-1">Sponsors</a></li>
              <li><a href="#!" className="text-dark text-decoration-none d-block">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold" style={{ color: "#a259ff" }}>Contact</h5>
            <p><i className="fas fa-home me-2" style={{ color: "#a259ff" }}></i>New Cairo, Egypt</p>
            <p><i className="fas fa-envelope me-2" style={{ color: "#a259ff" }}></i>abodyoussef2015@gmail.com</p>
            <p><i className="fas fa-phone me-2" style={{ color: "#a259ff" }}></i>+20 10 279 833 79</p>
            <p><i className="fas fa-print me-2" style={{ color: "#a259ff" }}></i>+20 10 279 833 79</p>
          </div>

          {/* Newsletter */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-5" style={{ color: "#a259ff" }}>Join Our DevCentral!</h5>
            <form className="d-flex gap-1" aria-label="Subscribe to newsletter">
              <input
                type="email"
                className="form-control px-3 "
                placeholder="Enter your email"
                aria-label="Email address"
                style={{
                  backgroundColor: "#f9f6ff",
                  border: "1px solid #a259ff",
                  borderRadius: "20px",
                }}
              />
              <button
                type="submit"
                className="btn btn-sm text-white px-4 "
                style={{
                  backgroundColor: "#a259ff",
                  borderRadius: "20px",
                  marginLeft: "-60px",
                }}
              >
                Register
              </button>
            </form>
          </div>
        </div>

        <hr className="my-4" />

        {/* Bottom Row */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center pb-3">
          <div className="text-muted small mb-2 mb-md-0">
            © {new Date().getFullYear()} DevCentral. All rights reserved.
          </div>
          <div className="d-flex gap-3">
            <a href="#" className="text-muted text-decoration-none">Terms</a>
            <a href="#" className="text-muted text-decoration-none">Privacy</a>
            <a href="#" className="text-muted text-decoration-none">Store</a>
            <a href="#" className="text-muted text-decoration-none">Developers</a>
          </div>
          <div className="mt-2 mt-md-0 d-flex gap-3 ">
            <a href="#" className="text-dark" aria-label="Twitter" >
              {/* <span  style={{color: "#a259ff"}}> </span> */}
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-dark" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-dark" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="text-dark" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
