import React from 'react';

const TrendingTags = () => (
  <div className="row">
    <div className="col s12">
      <ul className="tabs">
        <li className="tab col s2">
          <a href="#!">Life</a>
        </li>
        <li className="tab col s2">
          <a className="active" href="#!">
            Politics
          </a>
        </li>
        <li className="tab col s2">
          <a href="#!">Tech</a>
        </li>
        <li className="tab col s2">
          <a href="#!">Fashion</a>
        </li>
        <li className="tab col s2">
          <a href="#!">Music</a>
        </li>
        <li className="tab col s2">
          <a href="#!">Business</a>
        </li>
      </ul>
    </div>
  </div>
);

export default TrendingTags;
