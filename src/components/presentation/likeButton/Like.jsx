import React from 'react';
import PropTypes from 'prop-types';
import '../../../assets/sass/base.scss';

const Like = ({
  handleClick, isLike, article,
}) => (
  <div>
    {article && (
    <div>
      <i onClick={handleClick} className={isLike ? ('material-icons like-style-liked') : ('material-icons favorite like-style-unliked')} role="presentation">favorite</i>
    </div>
    )}
  </div>
);


Like.defaultProps = {
  article: {},
};

Like.propTypes = {
  article: PropTypes.oneOfType([PropTypes.object]),
  isLike: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Like;
