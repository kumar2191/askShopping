import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import "./nav.css";
const BagNavbar = () => {
  const bagHeader = () => {
    if (window.location.pathname === "/cart") {
      return (
        <Nav className="navs" navbar>
          <NavItem>
            <NavLink className="nav-bar2 bag" href="/cart">
              Bag
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-bar2">----</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-bar2">Address</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-bar2">----</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-bar2">Order</NavLink>
          </NavItem>
        </Nav>
      );
    } else if (window.location.pathname === "/address") {
      return (
        <Nav className="navs" navbar>
          <NavItem>
            <NavLink className="nav-bar2 bag" href="/cart">
              Bag
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-bar2 bag">----</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-bar2 address" href="/address">
              Address
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-bar2">----</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-bar2" href="/orders">
              Order
            </NavLink>
          </NavItem>
        </Nav>
      );
    } else if (
      window.location.pathname === "/orders" ||
      window.location.pathname === "/order/:OrderId"
    ) {
      return (
        <Nav className="navs" navbar>
          <NavItem>
            <NavLink className="nav-bar2 bag">Bag</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-bar2 bag">----</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-bar2 address">Address</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-bar2 address">----</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-bar2 order" href="/orders">
              Orders
            </NavLink>
          </NavItem>
        </Nav>
      );
    }
  };
  return (
    <React.Fragment>
      <Navbar className="navbar" light expand="md">
        <NavbarBrand href="/">
          <img className="brandlogo" src="https://bit.ly/2GTsTKe" alt="" />
        </NavbarBrand>
        {bagHeader()}
      </Navbar>
    </React.Fragment>
  );
};

export default BagNavbar;
