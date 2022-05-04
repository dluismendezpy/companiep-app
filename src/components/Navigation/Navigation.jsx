import React from "react";
import { Navbar, Container, Nav, NavbarBrand } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    Name: "Home",
    Route: "/",
  },
  {
    Name: "Department",
    Route: "/department",
  },
  {
    Name: "Employee",
    Route: "/employee",
  },
];

export default class Navigation extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand to="/">CompraniepNet</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {navItems.map((item) => (
                <NavLink
                  to={item.Route}
                  key={item.Name}
                  className="d-inline p-2 bg-dark text-white"
                >
                  {item.Name}
                </NavLink>
              ))}
            </Nav>
            <Nav>
              <Nav.Link eventKey={2} href="https://www.luismendezdev.com/" target="_blank">
                About developer
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
