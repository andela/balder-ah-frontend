import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

const NotFoundPage = () => (
  <div className="container not-found-page">
    <h2>
      Page Not Found
      {' '}
      <span role="img" aria-label="shrugs emoji">
      🤷🏾‍♂️
      </span>
    </h2>
    <Link to="/"><button type="button" className="btn">Go Back Home</button></Link>
  </div>
);

export default NotFoundPage;
