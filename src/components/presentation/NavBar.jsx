import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './navbar.scss';
import NavSearch from './NavSearch';

const NavBar = ({ location: { pathname } }) => (
  <nav className="nav">
    <div className="navbar">
      <div className="brand">
        <Link to="/">Authors Haven</Link>
      </div>

      <div className="nav-links">
        <ul id="nav-mobile" className="">
          { pathname !== '/search' && (
            <li>
              <NavSearch />
            </li>)
            }
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

NavBar.defaultProps = {
  location: null,
};

NavBar.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.object,
  ]),
};

export default withRouter(NavBar);
