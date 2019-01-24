import React from 'react';

const SmallArticleCard = () => (
  <div className="col s12 m6">
    <div className="card horizontal hoverable">
      <div className="card-image">
        <img src="https://lorempixel.com/100/190/nature/6" alt="smith" />
      </div>
      <div className="card-stacked">
        <div className="card-content">
          <p>I am a very simple card. I am good at containing small bits of information.</p>
        </div>
        <div className="card-action">
          <a href="#!">Read Now</a>
        </div>
      </div>
    </div>
  </div>
);

export default SmallArticleCard;
