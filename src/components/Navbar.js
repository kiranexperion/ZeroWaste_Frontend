import React, { useState , useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "../Assets/logo.jpg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import {AiFillStar,AiOutlineHome,AiOutlineFundProjectionScreen,AiOutlineUser,} from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import AuthContext from "../store/auth-context";
import './Navbar.css'

function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const authCtx = useContext(AuthContext);


  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  window.addEventListener("scroll", scrollHandler);

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex">
          <img src={logo} className="img-fluid logo" alt="brand" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <div className="navitems">
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
          {!authCtx.isLoggedIn && (
            <Nav.Item>
              <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>
                <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
              </Nav.Link>
            </Nav.Item>
          )}
           
            {!authCtx.isLoggedIn && (
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/about"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineUser style={{ marginBottom: "2px" }} /> About
              </Nav.Link>
            </Nav.Item>
            )}
       

            {!authCtx.isLoggedIn && (
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/login"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineFundProjectionScreen
                  style={{ marginBottom: "2px" }}
                />{" "}
                House Owner
              </Nav.Link>
            </Nav.Item>
            )}

          {!authCtx.isLoggedIn && (
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/msignin"
                onClick={() => updateExpanded(false)}
              >
                <CgFileDocument style={{ marginBottom: "2px" }} /> Corporation
              </Nav.Link>
            </Nav.Item>
            )}
         
         {/* {!authCtx.isLoggedIn && (
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/collectorlogin"
                onClick={() => updateExpanded(false)}
              >
                <CgFileDocument style={{ marginBottom: "2px" }} /> Collector
              </Nav.Link>
            </Nav.Item>
         )} */}
         
            {authCtx.isLoggedIn &&(
           
          <Link to={'/'}>
            <button onClick={authCtx.logout} className='logout' style={{ marginBottom: "2px" }}> Logout </button>
            </Link>
            )}
         
          </Nav>
        </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;