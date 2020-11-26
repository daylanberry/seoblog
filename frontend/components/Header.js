import React, { useState } from 'react';
import { APP_NAME } from '../config.js';
import Link from 'next/link';
import { signout, isAuth } from '../actions/auth';
import Router from 'next/router';

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
  DropdownItem,
  NavbarText
} from 'reactstrap';


const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link href='/'>
          <NavLink className='font-weight-bold'>{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {
              !isAuth() ? (
                <>
                  <NavItem>
                    <Link href='/signin'>
                      <NavLink>
                        Sign in
                      </NavLink>
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link href='/signup'>
                      <NavLink>
                        Sign up
                      </NavLink>
                    </Link>
                  </NavItem>
                </>
              ) : (
                <NavItem>
                  <NavLink
                    style={{cursor: 'pointer'}}
                    onClick={() => signout(() => Router.replace('/signin'))}
                  >
                    Sign out
                  </NavLink>
                </NavItem>
              )
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;