import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import onClickOutside from 'react-onclickoutside';

export const Nav = ({ userAgent, setUser }) => {
  const [open, setOpen] = useState(false);

  Nav.handleClickOutside = () => setOpen(false);

  function logOutToggler() {
    setUser('guest', false, null);
    fetch('http://localhost:5151/auth/logout', {
      method: 'GET',
      credentials: 'same-origin',
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  if (userAgent === 'guest') {
    return (
      <nav className="navbar">
        <NavLink to="/" className="logo nav-link">
          <i className="fas fa-mug-hot"></i>
        </NavLink>
        <ul
          className="nav-links"
          style={{ transform: open ? 'translateX(0px)' : '' }}
        >
          <li className="nav-li">
            <NavLink to="/" className="nav-link" onClick={() => setOpen(!open)}>
              Home
            </NavLink>
          </li>
          <li className="nav-li">
            <NavLink
              to="/locations"
              className="nav-link"
              onClick={() => setOpen(!open)}
            >
              Find
            </NavLink>
          </li>
          <li className="nav-li">
            <NavLink
              to="/login"
              className="nav-link"
              onClick={() => setOpen(!open)}
            >
              Signin
            </NavLink>
          </li>
          <li className="nav-li">
            <NavLink
              to="/register"
              className="nav-link"
              onClick={() => setOpen(!open)}
            >
              Sign Up
            </NavLink>
          </li>
        </ul>
        <i className="fas fa-bars burger" onClick={() => setOpen(!open)}></i>
      </nav>
    );
  } else if (userAgent === 'member') {
    return (
      <nav className="navbar">
        <ul
          className="nav-links"
          style={{ transform: open ? 'translateX(0px)' : '' }}
        >
          <NavLink to="/" className="nav-link">
            <i className="fas fa-mug-hot"></i>
          </NavLink>
          <li className="nav-li">
            <NavLink to="/" className="nav-link" onClick={() => setOpen(!open)}>
              Home
            </NavLink>
          </li>
          <li className="nav-li">
            <NavLink
              to="/locations"
              className="nav-link"
              onClick={() => setOpen(!open)}
            >
              Find
            </NavLink>
          </li>
          <li className="nav-li">
            <NavLink
              to="/profile"
              className="nav-link"
              onClick={() => setOpen(!open)}
            >
              Profile
            </NavLink>
          </li>
          <li className="nav-li" onClick={() => logOutToggler()}>
            <NavLink to="/" className="nav-link">
              Logout
            </NavLink>
          </li>
        </ul>
        <i className="fas fa-bars burger" onClick={() => setOpen(!open)}></i>
      </nav>
    );
  } else if (userAgent === 'admin') {
    return (
      <nav className="navbar">
        <NavLink to="/" className="logo nav-link">
          <i className="fas fa-mug-hot"></i>
        </NavLink>
        <ul
          className="nav-links"
          style={{ transform: open ? 'translateX(0px)' : '' }}
        >
          <li className="nav-li">
            <NavLink to="/" className="nav-link" onClick={() => setOpen(!open)}>
              Home
            </NavLink>
          </li>
          <li className="nav-li">
            <NavLink
              to="/locations"
              className="nav-link"
              onClick={() => setOpen(!open)}
            >
              Find
            </NavLink>
          </li>
          <li className="nav-li">
            <NavLink
              to="/dashboard"
              className="nav-link"
              onClick={() => setOpen(!open)}
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-li">
            <NavLink
              to="/profile"
              className="nav-link"
              onClick={() => setOpen(!open)}
            >
              Profile
            </NavLink>
          </li>
          <li className="nav-li" onClick={() => logOutToggler()}>
            <NavLink to="/" className="nav-link">
              Logout
            </NavLink>
          </li>
        </ul>
        <i className="fas fa-bars burger" onClick={() => setOpen(!open)}></i>
      </nav>
    );
  }
};

// const clickOutsideConfig = {
//   handleClickOutside: () => Nav.handleClickOutside,
// };

// export default onClickOutside(Nav, clickOutsideConfig);
