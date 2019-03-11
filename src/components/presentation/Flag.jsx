import React from 'react';
import PropTypes from 'prop-types';

const FlagArticle = ({ reportArticleCallback = null }) => (
  <div>
    <i
      id="report-article"
      onClick={reportArticleCallback}
      className="material-icons"
      role="presentation"
    >
      flag
    </i>
    <p className="tooltip-text">report this article</p>
  </div>
);

FlagArticle.propTypes = {
  reportArticleCallback: PropTypes.func.isRequired,
};

export default FlagArticle;
