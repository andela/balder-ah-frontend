import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReadTime from './ReadTime';
import Bookmark from './Bookmark';

const ArticleCard = ({ article, handleBookmarkClick }) => {
  const defaultImg = process.env.REACT_APP_ARTICLE_CARD_DEFAULT_IMG;
  return (
    <div className="col s12 m6 l6 all-card-content">
      <div className="card article-card">
        <div className="card-image">
          <img src={article.imgUrl ? article.imgUrl : defaultImg} alt={article.title} />
        </div>

        <div className="card-content">
          <span className="card-title">
            <Link to={`/articles/${article.slug}`}>{article.title}</Link>
          </span>
          <p className="article-description">{article.description}</p>

          <div className="article-author">
            <span>by</span>
            <b>{article.author.username}</b>
          </div>

          <div>
            <ReadTime article={article} />
          </div>

          <div className="article-tags">
            {article.tags.map(tag => (
              <Link to="/tags" key={tag.length * Math.random() * 200}>
                <span className="tags">{tag}</span>
              </Link>
            ))}
          </div>

          <div className="article-bookmark">
            <Bookmark
              handleBookmarkClick={handleBookmarkClick}
              article={article}
              isBookmarked={article.bookmarked}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

ArticleCard.defaultProps = {
  handleBookmarkClick: null,
};

ArticleCard.propTypes = {
  article: PropTypes.instanceOf(Object).isRequired,
  handleBookmarkClick: PropTypes.func,
};
export default ArticleCard;
