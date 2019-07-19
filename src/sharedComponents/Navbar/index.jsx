import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import './NavbarStyles.css';

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render(){
    return(
      <Navbar className="header" light expand="md">
        <NavbarBrand className="appTitle" href="/">Cytio Admin</NavbarBrand>
        <NavbarToggler id={'toggle'} onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink id='link' tag={Link} to="/users">Usuarios</NavLink>
            </NavItem>
            <NavItem>
              <NavLink id='link' tag={Link} to="/drivers">Taxistas</NavLink>
            </NavItem>
            <NavItem>
              <NavLink id='link' tag={Link} to="/organizations">Sitios</NavLink>
            </NavItem>
            <NavItem>
              <NavLink id='link' tag={Link} to="/services">Tipo de Servicio</NavLink>
            </NavItem>
            <NavItem>
              <NavLink id='link' tag={Link} to="/trips">Servicios Activos</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

