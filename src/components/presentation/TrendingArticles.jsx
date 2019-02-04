import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './TrendingArticles.scss';

const defaultImage = process.env.REACT_APP_DEFAULT_ARTICLE_IMAGE;

const TrendingArticles = ({ articles }) => {
  const [topTrending, ...otherTrending] = articles;
  return (
    <section className="trends">
      <h1 className="heading">Trending articles</h1>
      <div className="row">
        <div className="col s12 m6">
          <article className="trend top">
            <img src={topTrending.imgUrl || defaultImage} alt={topTrending.title} />
            <h3 className="title truncate"><Link to={`/articles/${topTrending.slug}`}>{topTrending.title}</Link></h3>
            <p className="description truncate">{topTrending.description}</p>
            <p className="author">
              {'by '}
              <span>{topTrending.author.username}</span>
            </p>
            <div className="more">
              <p className="ratings">
                <i className="material-icons">star</i>
                <i className="material-icons">star</i>
                <i className="material-icons">star</i>
                <i className="material-icons">star</i>
                <i className="material-icons">star_border</i>

              </p>
              <p><Link className="btn btn-small" to={`/articles/${topTrending.slug}`}>Read more</Link></p>
            </div>
          </article>
        </div>
        <div className="col s12 m6">
          <div className="trend-right">
            {
            otherTrending.map(({
              id, title, slug, description, author: { username },
              imgUrl,
            }) => (
              <div key={id} className="col m6">
                <article className="trend">
                  <img src={imgUrl || defaultImage} alt="" />
                  <h3 className="title truncate"><Link to={`/articles/${slug}`}>{title}</Link></h3>
                  <p className="description truncate">{description}</p>
                  <p className="author">
                    {'by '}
                    <span>{username}</span>
                  </p>
                </article>
              </div>
            ))
        }

          </div>
        </div>
      </div>
    </section>
  );
};

TrendingArticles.defaultProps = {
  articles: [],

};

TrendingArticles.propTypes = {
  articles: PropTypes.oneOfType([
    PropTypes.array,
  ]),
};

export default TrendingArticles;
