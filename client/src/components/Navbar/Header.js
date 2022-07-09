import React, { Component } from "react";
import {Navbar,NavbarBrand,Nav,NavItem,NavLink} from 'reactstrap';
import './nav.css';
import SearchBar from './SearchBar';
import Icon from "../Icon/Icon";
import Men from '../NavList/MenList';
import LogLogout from "../NavList/LogLogout";
import ToggleDisplay from "react-toggle-display";
// import Logo from "../android-chrome-192x192.png";
class Header extends Component {
  constructor() {
    super();
    this.state = { men: false ,show2:false};
  }
  handleClick() {
    this.setState({
      men: !this.state.men
    });
  }
    handleClick1() {
    this.setState({
      men: !this.state.men
    });
  }
  handleClick2() {
    this.setState({
      show2: !this.state.show2
    });
  }
  render() {
    return (
      <React.Fragment>
        <Navbar className="navbar" light expand="md">
          <NavbarBrand href="/">
            <img className="brandlogo" src="https://bit.ly/2GTsTKe" alt="no" />
          </NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink className="nav-bar" onClick={() => this.handleClick()}>
                MEN
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-bar">WOMEN</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-bar">KIDS</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-bar">HOME</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-bar">FURNITURE</NavLink>
            </NavItem>
            <NavItem>
              <SearchBar />
            </NavItem>
            <NavItem className="sideIcon">
              <Icon
                className="fa fa-user fa-2x"
                onMouseOver={() => this.handleClick2()}
              />
            </NavItem>
            <NavItem className="sideIcon">
              <a href='/whislist'>
              <Icon className="fa fa-bookmark fa-2x" />
              </a>
            </NavItem>
            <NavItem className="sideIcon">
              <a href='/cart'>
              <Icon className="fa fa-shopping-bag fa-2x" />
              </a>
            </NavItem>
          </Nav>
        </Navbar>
        <ToggleDisplay show={this.state.men}>
          <Men />
        </ToggleDisplay>
        <ToggleDisplay show={this.state.show2}>
          <LogLogout />
        </ToggleDisplay>
      </React.Fragment>
    );
  }
}

export default Header;
