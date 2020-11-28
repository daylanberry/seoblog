import React, { useState } from 'react';
import { APP_NAME } from '../config.js';
import Link from 'next/link';
import NProgress from 'nprogress';
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

import '.././node_modules/nprogress/nprogress.css'

if (typeof window !== "undefined") {
  NProgress.configure({
    showSpinner: false
  });

  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });

  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });

  Router.events.on("routeChangeError", () => {
    NProgress.done();
  });
}

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
                <NavItem style={{display: 'flex'}}>
                  <Link href={isAuth().role === 1 ? '/admin' : '/user'}>
                    <NavLink>
                      {`${isAuth().name}'s Dashboard`}
                    </NavLink>
                  </Link>
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