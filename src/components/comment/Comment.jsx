import React from 'react';
import PropTypes from 'prop-types';
import anonymousAvatar from '../../assets/images/anonymous.png';
import './Comment.scss';

const Comment = ({ comment }) => {
  const { body, createdAt, author: { username, image } } = comment;
  return (
    <div className="comment">
      <img
        src={image || anonymousAvatar}
        alt={`${username} avatar`}
        className="comment-author-img"
      />
      <div className="comment-detail">
        <h3 className="comment-author">{username}</h3>
        <p className="comment-date">{(new Date(createdAt)).toDateString()}</p>
        <p className="comment-body">{body}</p>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Comment;
