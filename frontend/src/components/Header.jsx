import { NavLink, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Header() {
  return (
    <Navbar
      expand="lg"
      className="position-sticky top-0 z-3 shadow-sm px-4 p-0"
      style={{
        backdropFilter: "blur(10px)", // Apply blur effect
        backgroundColor: "rgba(255, 255, 255, 0.7)", // Add semi-transparent background
      }}
    >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Brand href="\" className="font-weight-bold fs-md-3 fw-bold big-shoulders d-flex align-items-center flex-row gap-2">
        <img
          alt=""
          src="/Dev_logo.jpg"
          width="60"
          height="60"
          className="d-inline-block align-top"
        />{" "}
        <span className="fw-bold fs-4 text-black share-tech-mono-regular">DevCentral</span>
      </Navbar.Brand>
      <NavLink className={"nav-link"}>
        <i className="fa-solid fa-user fs-5 d-inline d-lg-none px-2 text-success"></i>
      </NavLink>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-1 fw-bold share-tech-mono-regular">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active text-primary" : "nav-link"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/games"
            className={({ isActive }) =>
              isActive ? "nav-link active text-primary" : "nav-link"
            }
          >
            Games
          </NavLink>
          <NavLink
            to="/apps"
            className={({ isActive }) =>
              isActive ? "nav-link active text-primary" : "nav-link"
            }
          >
            Apps
          </NavLink>
          {/* <Nav.Link className="nav-link" href="#">Contact</Nav.Link> */}
        </Nav>
        <div className="d-flex ms-auto align-items-center">
          <form className="d-flex me-3 share-tech-mono-regular">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search..."
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-black" type="submit">
              <i className="fa-solid fa-search"></i>
            </button>
          </form>
          <NavLink className={"nav-link"}>
            <i className="fa-solid fa-user fs-5 px-2 text-black"></i>
          </NavLink>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
