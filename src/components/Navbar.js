import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../styles/Navbar.css';

function CustomNavbar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
      expand="lg"
      className="custom-navbar"
      expanded={expanded}
      onToggle={(expanded) => setExpanded(expanded)}
    >
      <Container>
        <Navbar.Brand href="#home" className="custom-brand">
          <i className="fas fa-user-plus me-2"></i>
          Mi App Registro
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              href="#home"
              className="custom-link"
              onClick={() => setExpanded(false)}
            >
              Inicio
            </Nav.Link>
            <Nav.Link
              href="#register"
              className="custom-link"
              onClick={() => setExpanded(false)}
            >
              Registro
            </Nav.Link>
            <Nav.Link
              href="#login"
              className="custom-link"
              onClick={() => setExpanded(false)}
            >
              Iniciar Sesión
            </Nav.Link>
            <Nav.Link
              href="#contact"
              className="custom-link"
              onClick={() => setExpanded(false)}
            >
              Contacto
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;