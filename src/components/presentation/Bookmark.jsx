import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/sass/base.scss';

const Bookmark = ({ handleBookmarkClick, isBookmarked, article }) => (
  <div>
    {article && (
      <div>
        <i
          id="bookmark"
          onClick={handleBookmarkClick}
          className={isBookmarked
            ? ('material-icons unbookmark-style')
            : ('material-icons bookmark-style')}
          role="presentation"
        >
        bookmark
        </i>
        <p className="tooltip-text">bookmark article to read later</p>
      </div>
    )}
  </div>
);


Bookmark.defaultProps = {
  article: {},
  handleBookmarkClick: null,
  isBookmarked: false,
};

Bookmark.propTypes = {
  article: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  isBookmarked: PropTypes.bool,
  handleBookmarkClick: PropTypes.func,
};

export default Bookmark;
