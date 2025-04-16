export default function Footer() {
    return (
      <>
        <div>
          <footer
            id="contact-section"
            className="text-center text-lg-start text-white bg-dark">
            <section
              className="d-flex justify-content-between p-4"
              style={{ backgroundColor: "#198754" }}
            >
              <div className="me-5">
                <span>Get connected with us on social networks:</span>
              </div>
  
              <div>
                <a href="https://www.facebook.com/cihyalace.abdo/" target="_blank" className="text-white me-4">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-white me-4">
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
                <a href="mailto:abodyoussef2015@gmail.com" className="text-white me-4">
                  <i className="fab fa-google"></i>
                </a>
                <a href="https://www.instagram.com/abdoyoussef_2/" target="_blank" className="text-white me-4">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/in/abdel-rahman-youssef-16664b236/" target="_blank" className="text-white me-4">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/CIHYALACE" target="_blank" className="text-white me-4">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </section>
  
            <section className="">
              <div className="container text-center text-md-start mt-5">
                <div className="row mt-3">
                  <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                    <h6 className="text-uppercase fw-bold share-tech-mono-regular">DevCentral</h6>
                    <hr
                      className="mb-4 mt-0 d-inline-block mx-auto"
                      style={{
                        width: "60px",
                        backgroundColor: "#f40006",
                        height: "2px",
                      }}
                    />
                    <p>
                      Here you can use rows and columns to organize your footer
                      content. Lorem ipsum dolor sit amet, consectetur adipisicing
                      elit.
                    </p>
                  </div>
  
                  <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                    <h6 className="text-uppercase fw-bold share-tech-mono-regular">Products</h6>
                    <hr
                      className="mb-4 mt-0 d-inline-block mx-auto"
                      style={{
                        width: "60px",
                        backgroundColor: "#f40006",
                        height: "2px",
                      }}
                    />
                    <p>
                      <a href="#!" className="text-white share-tech-mono-regular">
                        Online Couching
                      </a>
                    </p>
                    <p>
                      <a href="#!" className="text-white share-tech-mono-regular">
                        Training Program
                      </a>
                    </p>
                    <p>
                      <a href="#!" className="text-white share-tech-mono-regular">
                        Meal Plans
                      </a>
                    </p>
                    <p>
                      <a href="#!" className="text-white share-tech-mono-regular">
                        Trainers
                      </a>
                    </p>
                  </div>
  
                  <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                    <h6 className="text-uppercase fw-bold share-tech-mono-regular">Useful links</h6>
                    <hr
                      className="mb-4 mt-0 d-inline-block mx-auto"
                      style={{
                        width: "60px",
                        backgroundColor: "#f40006",
                        height: "2px",
                      }}
                    />
                    <p>
                      <a href="#!" className="text-white share-tech-mono-regular">
                        Home
                      </a>
                    </p>
                    <p>
                      <a href="#!" className="text-white share-tech-mono-regular">
                        About
                      </a>
                    </p>
                    <p>
                      <a href="#!" className="text-white share-tech-mono-regular">
                        Sponsers
                      </a>
                    </p>
                    <p>
                      <a href="#!" className="text-white share-tech-mono-regular">
                        Contact
                      </a>
                    </p>
                  </div>
  
                  <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                    <h6 className="text-uppercase fw-bold">Contact</h6>
                    <hr
                      className="mb-4 mt-0 d-inline-block mx-auto"
                      style={{
                        width: "60px",
                        backgroundColor: "#f40006",
                        height: "2px",
                      }}
                    />
                    <p>
                      <i className="fas fa-home mr-3"></i> New Cairo, 10012, Egypt
                    </p>
                    <p>
                      <i className="fas fa-envelope mr-3"></i> abodyoussef2015@gmail.com
                    </p>
                    <p>
                      <i className="fas fa-phone mr-3"></i> +020 10 279 833 79
                    </p>
                    <p>
                      <i className="fas fa-print mr-3"></i> +020 10 279 833 79
                    </p>
                  </div>
                </div>
              </div>
            </section>
  
            <div
              className="text-center p-3"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
              © 2020 Copyright:
              <a className="text-white" href="#">
                Fit Connect
              </a>
            </div>
          </footer>
        </div>
      </>
    );
  }
  