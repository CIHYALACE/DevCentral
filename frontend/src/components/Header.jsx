import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { searchPrograms } from "../store/programStore";
import { authStore } from "../store/authStore";
import { useStore } from "@tanstack/react-store";
import axios from "axios";
import { API_URL } from "../store";

export default function Header({ onToggleSidebar }) {
  let token = localStorage.getItem('token');
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const isProfilePage = location.pathname.startsWith('/profile');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = useStore(authStore, state => state.user);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      
      try {
        // Get user details from the backend
        const response = await axios.get(`${API_URL}/auth/users/me/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        const userData = response.data;
        console.log("User data from API:", userData);
        
        // Check if user has admin role
        setIsAdmin(userData.role === "admin");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsAdmin(false);
        setLoading(false);
      }
    };
    
    checkAdminStatus();
    
    // Re-run this effect when the location changes
  }, [location.pathname]);

  return (
    <Navbar
      expand="lg"
      className="position-sticky top-0 z-3 shadow-sm px-4 p-2"
      style={{
        backdropFilter: "blur(15px)",
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
          className="d-inline-block align-top rounded-circle" 
        />{" "}
        <span className="fw-bold fs-3 text-black share-tech-mono-regular d-none d-sm-inline"><span style={{color: "#a259ff"}}>Dev</span>Central</span>
        <span className="fw-bold fs-4 text-black share-tech-mono-regular d-inline d-sm-none">DC</span>
      </Navbar.Brand>
      <NavLink to={token ? "/profile" : "/login"} className={"nav-link"}>
        <i className="fa-solid fa-user fs-5 d-inline d-lg-none px-2 text-black"></i>
      </NavLink>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-2 fw-bold share-tech-mono-regular">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
            style={({ isActive }) => (isActive ? { color: "#a259ff" } : undefined)}
          >
            Home
          </NavLink>
          <NavLink
            to="/games"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
            style={({ isActive }) => (isActive ? { color: "#a259ff" } : undefined)}
          >
            Games
          </NavLink>
          <NavLink
            to="/apps"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
            style={({ isActive }) => (isActive ? { color: "#a259ff" } : undefined)}
          >
            Apps
          </NavLink>
          <NavLink
            to="/books"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
            style={({ isActive }) => (isActive ? { color: "#a259ff" } : undefined)}
          >
            Books
          </NavLink>
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
            style={({ isActive }) => (isActive ? { color: "#a259ff" } : undefined)}
          >
            Chat
          </NavLink>

          {isAdmin && (
            <NavLink to="/admin" className="nav-link">Admin</NavLink>
          )}
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
              style={{ borderColor: "#a259ff", color: "#a259ff" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}

            />
            <button
              
              className="btn"
              
              type="submit"
              disabled={!searchQuery.trim()}
            
              style={{
                backgroundColor: "#a259ff",
                color: "white",
              }}
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
