import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FiHome } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate();

  const handleSignout = () =>{
     localStorage.removeItem("token")
  }
  
  return (
    <div>   
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navbar" fixed="top">
          <Container>
              <Navbar.Brand className="text-dark logo shadow bg-light">MeAsStudent</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto">
                  <LinkContainer to="/" activeStyle={{ color: "white", textDecoration: "none", background: "orange" }}>
                      <Nav.Link className="px-4"><FiHome className="me-1" size={28} />Main</Nav.Link>
                  </LinkContainer>
                  {
                  localStorage.getItem('token') &&
                    <LinkContainer to="/Home" activeStyle={{ color: "white", textDecoration: "none", background: "orange" }}>
                        <Nav.Link className="px-4"><FiHome className="me-1" size={28} />Home </Nav.Link>
                    </LinkContainer>
                  }
                  <LinkContainer to="/register" activeStyle={{ color: "white", textDecoration: "none", background: "orange" }}>
                      <Nav.Link className="px-4"><FiHome className="me-1" size={28} />Register </Nav.Link>
                  </LinkContainer>
                  {
                  localStorage.getItem('token') == null &&
                    <LinkContainer to="/signin" activeStyle={{ color: "white", textDecoration: "none", background: "orange" }}>
                        <Nav.Link className="px-4"><FiHome className="me-1" size={28} />Signin </Nav.Link>
                    </LinkContainer>
                  }
                  {
                  localStorage.getItem('token') &&
                    <LinkContainer to="/" activeStyle={{ color: "white", textDecoration: "none", background: "orange" }}>
                        <Nav.Link className="px-4" onClick={() => {handleSignout()}}><FiHome className="me-1" size={28} />Signout </Nav.Link>
                    </LinkContainer>
                  }
                </Nav>
              </Navbar.Collapse>
          </Container>
        </Navbar>
    </div>
  );
}
  
export default Header;


