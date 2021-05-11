import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/Reducers'
import {logout} from '../redux/Actions/auth'


const Header = () => {

  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated)
  const user = useSelector((state:RootState) => state.auth.user)
  const isLoading = useSelector((state:RootState) => state.auth.isLoading)

  const {location} = useHistory()

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
              <NavDropdown.Item onClick={() => dispatch(logout())}>Logout</NavDropdown.Item>
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
