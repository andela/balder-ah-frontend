import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Like from '../presentation/likeButton/Like';
import { likeComment, unlikeComment } from '../../actions/reactions/likeComment';
import './Comment.scss';
import anonymousAvatar from '../../assets/images/anonymous.png';
import Button from '../presentation/Button';
import EditCommentForm from './EditCommentForm';
import { editComment } from '../../actions/articles';

class Comment extends Component {
  state = {
    editing: false,
    editedComment: '',
  }

  onEditValueChange = (e) => {
    this.setState({ editedComment: e.target.value });
  }

  hideEditForm = () => {
    this.setState({ editedComment: '' });
    this.setState({ editing: false });
  }

  saveEdit = async (oldComment, newComment, commentId) => {
    const { articleSlug, editComment: updateComment } = this.props;
    if (oldComment === newComment) {
      this.hideEditForm();
      return;
    }

    await updateComment(newComment, commentId, articleSlug);
    this.hideEditForm();
  }

  showEditForm = () => {
    const { comment: { body } } = this.props;
    this.setState({ editedComment: body });
    this.setState({ editing: true });
  }


  handleFavouriteComment = async (commentId) => {
    try {
      const {
        article: { slug }, likeComment: commentLike, unlikeComment: commentUnlike, isCommentLike,
      } = this.props;
      return isCommentLike
        ? await commentUnlike(slug, commentId) : await commentLike(slug, commentId);
    } catch (error) {
      return null;
    }
  }

  render() {
    const { editing, editedComment } = this.state;
    const { comment, isCommentLike, user } = this.props;
    const {
      body, createdAt, author: { username, image }, userId: authorId, id, edited: isEdited,
    } = comment;
    const isCommentAuthor = user && user.id === authorId;
    return (
      <div className="comment">
        <img
          src={image || anonymousAvatar}
          alt={`${username} avatar`}
          className="comment-author-img"
        />
        <div className="comment-detail">
          <h3 className="comment-author">{username}</h3>
          { isCommentAuthor && (
            <Button
              handleClick={this.showEditForm}
              className="comment-edit"
              title="edit"
            />
          )}
          <p className="comment-date">{(new Date(createdAt)).toDateString()}</p>
          { !editing && (
            <p className="comment-body">
              {`${body} `}
              {isEdited && <span className="is-edited">(edited)</span>}
            </p>
          )}
          { editing
            && isCommentAuthor
            && (
            <EditCommentForm
              comment={editedComment}
              handleEditValueChange={this.onEditValueChange}
              handleCancelEdit={this.hideEditForm}
              handleSaveEdit={() => this.saveEdit(body, editedComment, id)}
            />
            )
          }
          {/* <p className="comment-date">{(new Date(createdAt)).toDateString()}</p>
          <p className="comment-body">{body}</p> */}
          <Like
            handleClick={() => this.handleFavouriteComment(id)}
            isLike={isCommentLike}

          />
        </div>
      </div>
    );
  }
}
Comment.defaultProps = {
  articleSlug: '',
  user: null,
  editComment: null,
};

const mapStateToProps = ({ auth, article }) => ({
  isLoggedIn: auth && auth.isLoggedIn ? auth.isLoggedIn : false,
  article: article && article.response.getOneArticle ? article.response.getOneArticle : '',
  isCommentLike: article.selectedArticle
  && article.selectedArticle.comments ? article.isCommentLike : false,
  user: auth.user,
});

Comment.propTypes = {
  articleSlug: PropTypes.string,
  comment: PropTypes.oneOfType([PropTypes.object]).isRequired,
  user: PropTypes.oneOfType([
    PropTypes.object,
  ]),
  editComment: PropTypes.func,
  isCommentLike: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { editComment, likeComment, unlikeComment })(Comment);
