import * as React from 'react';
// import { NavLink } from 'react-router-dom';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// import { withRouter } from 'react-router-dom';
import './Header.css';

import logo from './images/logo.png';

export interface IProps {
  isLoggedIn?: boolean;
  user?: any;
}


class Header extends React.Component<IProps> {
  public render() {
    const { isLoggedIn = false, user = {} } = this.props;
    return (
      // <nav className='Header'>
      // <NavLink to='/home' className='Header__item' activeClassName='Header__item-active'>Home</NavLink>
      // <NavLink to='/todo' className='Header__item' activeClassName='Header__item-active'>Todo</NavLink>
      // </nav>
      <Navbar className='Header' style={{ marginBottom: '0' }} inverse collapseOnSelect staticTop fluid>
      <Navbar.Header>
        <Navbar.Brand>
          <LinkContainer to='/home'>
            {/* <a>Super TODO app</a> */}
            <img src={logo} height='50' />
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
      <Nav >
        <LinkContainer to='/home'>
          <NavItem eventKey={10}>
          HOME
          </NavItem>
        </LinkContainer>
        <LinkContainer to='/todo'>
          <NavItem eventKey={11}>
          TO-DO
          </NavItem>
        </LinkContainer>
      </Nav>
        { isLoggedIn ? (
          <Nav pullRight>
            <NavDropdown eventKey={4} title={`Hello, ${user.name}`} id='basic-nav-dropdown'>
              <MenuItem eventKey={4.1}>Logout</MenuItem>
            </NavDropdown>
          </Nav>
          ) : (
            <Nav pullRight>
              <LinkContainer to='/login'>
                <NavItem eventKey={10}>
                LOG IN
                </NavItem>
              </LinkContainer>
              <LinkContainer to='/signup'>
                <NavItem eventKey={11}>
                SIGN UP
                </NavItem>
              </LinkContainer>
            </Nav>
          )}

      </Navbar.Collapse>
    </Navbar>
    );
  }
}

export default Header;
