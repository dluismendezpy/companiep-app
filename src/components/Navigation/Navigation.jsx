import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import brand from "../../assets/brand.png";

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
      <Navbar bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Container className="text-white">
          <img
            className="d-inline-block align-top brand-image"
            height="50px"
            alt="Brand"
            src={brand}
          />
          <Navbar.Brand href="/">CompaniepNet</Navbar.Brand>
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
        </Container>
      </Navbar>
    );
  }
}
