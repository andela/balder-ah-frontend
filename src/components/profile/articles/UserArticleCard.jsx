import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './UserArticleCard.scss';

const UserArticleCard = ({
  articleTitle,
  articleSlug,
  editCallback,
  deleteCallback,
}) => (
  <div className="user-article-card">
    <h4><Link to={`/articles/${articleSlug}`}>{articleTitle}</Link></h4>
    <div className="user-article-card__actions">
      <button className="user-article-card--edit btn btn-transparent" onClick={editCallback} type="button">
        Edit
      </button>
      <button className="user-article-card--delete btn btn-transparent" onClick={deleteCallback} type="button">
        Delete
      </button>
    </div>
  </div>
);

UserArticleCard.defaultProps = {
  editCallback: null,
  deleteCallback: null,
};

UserArticleCard.propTypes = {
  articleTitle: PropTypes.string.isRequired,
  articleSlug: PropTypes.string.isRequired,
  editCallback: PropTypes.func,
  deleteCallback: PropTypes.func,
};

export default UserArticleCard;
