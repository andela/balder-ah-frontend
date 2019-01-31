import React from 'react';
import PropTypes from 'prop-types';
import HorizontalArticleCard from './HorizontalArticleCard';
import './FeaturedArticles.scss';

const FeaturedArticles = ({ articles }) => (
  <section className="featured">
    <h1 className="heading">Featured articles</h1>
    {
        articles.map(article => <HorizontalArticleCard key={article.id} article={article} />)
    }
  </section>
);

FeaturedArticles.defaultProps = {
  articles: [],
};

FeaturedArticles.propTypes = {
  articles: PropTypes.oneOfType([
    PropTypes.array,
  ]),
};

export default FeaturedArticles;
