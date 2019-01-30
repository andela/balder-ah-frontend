import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './HorizontalArticleCard.scss';

const imgDefault = process.env.REACT_APP_DEFAULT_ARTICLE_IMAGE;

const HorizontalArticleCard = ({ article }) => {
  const {
    slug, imgUrl, title, description, author: { username }, tags,
  } = article;
  return (
    <div key={slug} className="ha-card">
      <img src={imgUrl || imgDefault} alt={title} />
      <div className="ha-card-info">
        <h3 className="ha-card-title truncate"><Link to={`/articles/${slug}`}>{title}</Link></h3>
        <p className="truncate ha-card-description">{description}</p>
        <p>
          {'by '}
          <span className="ha-card-username">{username}</span>
        </p>
        <div className="ha-card-tag"><span>{tags[0].name}</span></div>
      </div>
    </div>
  );
};

HorizontalArticleCard.propTypes = {
  article: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
};

export default HorizontalArticleCard;
