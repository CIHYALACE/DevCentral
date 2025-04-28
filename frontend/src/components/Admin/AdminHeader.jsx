import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function AdminHeader() {
  return (
    <Navbar
      expand="lg"
      className="position-sticky top-0 z-3 shadow-sm px-4 p-0"
      style={{
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
      }}
    >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Brand href="\admin" className="font-weight-bold fs-md-3 fw-bold big-shoulders d-flex align-items-center flex-row gap-2 ">
        <img
          alt=""
          src="/Dev_logo.jpg"
          width="60"
          height="60"
          className="d-inline-block align-top"
        />{" "}
        <span className="fw-bold fs-4 text-black share-tech-mono-regular">DevCentral Administration</span>
      </Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-1 fw-bold share-tech-mono-regular gap-3 ms-auto">
          <NavLink
            to="/"
            className="text-decoration-none text-black"
          >
            View Site
          </NavLink>
          <NavLink
            to="#"
            className="text-decoration-none text-black"
          >
            Change Password
          </NavLink>
          <NavLink
            to="/apps"
            className="text-decoration-none text-black"
          >
            Log Out
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
