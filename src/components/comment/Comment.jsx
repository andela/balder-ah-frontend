import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

  render() {
    const { comment, user } = this.props;
    const { editing, editedComment } = this.state;
    const {
      userId: authorId, body, createdAt, author: { username, image }, id, edited: isEdited,
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

Comment.propTypes = {
  articleSlug: PropTypes.string,
  comment: PropTypes.oneOfType([PropTypes.object]).isRequired,
  user: PropTypes.oneOfType([
    PropTypes.object,
  ]),
  editComment: PropTypes.func,
};

const mapStateToProps = ({ auth }) => ({ user: auth.user });

export default connect(mapStateToProps, {
  editComment,
})(Comment);
