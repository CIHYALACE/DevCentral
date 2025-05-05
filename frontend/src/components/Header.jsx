import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { searchPrograms } from "../store/programStore";

export default function Header({ onToggleSidebar }) {
  let token = "token";
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const isProfilePage = location.pathname.startsWith('/profile');
  
  return (
    <Navbar
      expand="lg"
      className="position-sticky top-0 z-3 shadow-sm px-4 p-0"
      style={{
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
      }}
    >
      {/* {isProfilePage && (
        <Button 
          variant="outline-secondary" 
          className="d-md-none me-2" 
          onClick={onToggleSidebar}
        >
          <i className="bi bi-list"></i>
        </Button>
      )} */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Brand href="\" className="font-weight-bold fs-md-3 fw-bold big-shoulders d-flex align-items-center flex-row gap-2">
        <img
          alt=""
          src="/Dev_logo.jpg"
          width="60"
          height="60"
          className="d-inline-block align-top"
        />{" "}
        <span className="fw-bold fs-4 text-black share-tech-mono-regular d-none d-sm-inline">DevCentral</span>
        <span className="fw-bold fs-4 text-black share-tech-mono-regular d-inline d-sm-none">DC</span>
      </Navbar.Brand>
      <NavLink to={token ? "/profile" : "/login"} className={"nav-link"}>
        <i className="fa-solid fa-user fs-5 d-inline d-lg-none px-2 text-black"></i>
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
          <NavLink
            to="/books"
            className={({ isActive }) =>
              isActive ? "nav-link active text-primary" : "nav-link"
            }
          >
            Books
          </NavLink>
          <NavLink to="/admin" className="nav-link">Admin</NavLink>
        </Nav>
        <div className="d-flex ms-auto align-items-center">
          <form 
            className="d-flex me-3 share-tech-mono-regular"
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
              }
            }}
          >
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search programs"
            />
            <button 
              className="btn btn-black" 
              type="submit"
              disabled={!searchQuery.trim()}
            >
              <i className="fa-solid fa-search"></i>
            </button>
          </form>
          <NavLink to={token ? "/profile" : "/login"} className={"nav-link"}>
            <i className="fa-solid fa-user fs-5 px-2 text-black"></i>
          </NavLink>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
