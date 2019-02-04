import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './LatestArticles.scss';

const defaultImage = process.env.REACT_APP_DEFAULT_ARTICLE_IMAGE;

const LatestArticles = ({ articles }) => (
  <section className="latest">
    <h1 className="heading">Latest articles</h1>
    <div className="row">
      {
        articles.map(({
          id, title, imgUrl, slug, description, author: { username },
        }, i) => (
          <div key={id} className={`col m4 ${i === 0 ? 's12' : 's6'}`}>
            <article className="latest">
              <img src={imgUrl || defaultImage} alt={title} />
              <div className="meta">
                <h3 className="title truncate"><Link to={`/articles/${slug}`}>{title}</Link></h3>
                <p className="description truncate">{description}</p>
                <p className="author">
                  {'by '}
                  <span>{username}</span>
                </p>
              </div>
            </article>
          </div>
        ))
    }

    </div>
  </section>
);

LatestArticles.defaultProps = {
  articles: [],
};

LatestArticles.propTypes = {
  articles: PropTypes.oneOfType([
    PropTypes.array,
  ]),
};
export default LatestArticles;
