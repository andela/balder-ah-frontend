import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <nav>
    <div className="nav-wrapper container">
      <Link to="/" className="brand-logo">
        AH Balder
      </Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/singup">Sign Up</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Nav;
