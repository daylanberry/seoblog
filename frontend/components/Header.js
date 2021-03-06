import React, { useState } from 'react';
import { APP_NAME } from '../config.js';
import Link from 'next/link';
import NProgress from 'nprogress';
import { signout, isAuth } from '../actions/auth';
import Router from 'next/router';
import Search from './blog/search'

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
    <>
      <Navbar color="light" light expand="md">
        <Link href='/'>
          <NavLink className='font-weight-bold'>{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <>
              <NavItem>
                <Link href='/blogs'>
                  <NavLink>
                    Blogs
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href='/contact'>
                  <NavLink>
                    Contact
                  </NavLink>
                </Link>
              </NavItem>
            </>
            {
              isAuth() ? (
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
              ) : (
                <>
                <NavItem>
                  <Link href='/signup'>
                    <NavLink>
                      Signup
                    </NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href='/signin'>
                    <NavLink>
                      Signin
                    </NavLink>
                  </Link>
                </NavItem>
                </>
              )
            }
            <NavItem>
                <a href='/user/crud/blog' className='btn btn-primary text-light'>
                  Write a blog
                </a>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Search />
    </>
  );
}

export default Header;