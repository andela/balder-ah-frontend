import React from 'react';
import { Link } from 'react-router-dom';

import '../../assets/sass/base.scss';

const date = new Date().getFullYear();
const Footer = () => (
  <div className="page-footer">
    <div className="container">
      <div className="copyright">
        &copy;&nbsp;
        {'Author\'s Haven'}
        &nbsp;
        {date}
      </div>
      <div className="footer-links">
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
        <Link to="/">Terms of use</Link>
        <Link to="/">Privacy Policy</Link>
      </div>
    </div>
  </div>
);

export default Footer;
