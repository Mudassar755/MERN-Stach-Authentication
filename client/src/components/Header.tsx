import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";

import { GlobalContext } from '../context/GlobalState'

function Header() {
  const {location} = useHistory()
  const { isAuthenticated, isLoading, user, logout } = useContext(GlobalContext)
  console.log("hissss", location.pathname)
  console.log("user", user)
  return (
    <Navbar collapseOnSelect expand="lg" bg={location.pathname === "/" ? "dark" : "primary"} variant="dark" sticky="top">
      <div className="container">
        <Navbar.Brand>
          <Link to="/" className="navbar-brand">
            Home
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {!isLoading && (

          <Nav className="navbar-nav ml-auto">
            {isAuthenticated ? <NavDropdown title={user && user.name} id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={() => logout && logout()}>Logout</NavDropdown.Item>
            </NavDropdown> :
              <>
                <Nav.Item>
                  <Nav.Link>
                    {" "}
                    <Link to="/login" className="nav-link">
                      Login
                </Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    {" "}
                    <Link to="/signup" className="nav-link">
                      SignUp
              </Link>
                  </Nav.Link>

                </Nav.Item>
              </>}
          </Nav>
          )}
         
        </Navbar.Collapse>


      </div>
    </Navbar>
  );
}

export default Header;
