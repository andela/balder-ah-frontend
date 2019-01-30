import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';

const NavBar = () => (
  <nav className="nav">
    <div className="navbar">
      <div className="brand">
        <Link to="/">Authors Haven</Link>
      </div>

      <div className="nav-links">
        <ul id="nav-mobile" className="">
          <li>
            <Link to="/articles">Articles</Link>
          </li>
          <li>
            <Link to="/create-article">Create article</Link>
          </li>

          <li>
            <i className="small icon material-icons">search</i>
          </li>

          <li>
            <i className="small icon material-icons">menu</i>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default NavBar;
