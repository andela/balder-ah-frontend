import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './CommentForm.scss';
import TextArea from '../presentation/TextArea';
import { commentOnArticle } from '../../actions/articles';
import Button from '../presentation/Button';

class CommentForm extends Component {
  onComment = async ({ comment }) => {
    const { commentOnArticle: dispatchCommentOnArticle, articleSlug, reset } = this.props;
    await dispatchCommentOnArticle(articleSlug, comment);
    reset();
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onComment)} className="comment-box-form">
        <Field
          placeholder="Leave a comment"
          name="comment"
          required
          className="comment-box"
          component={TextArea}
        />
        <Button type="submit" title="Add comment" className="waves-effect waves-light btn btn-small" />
      </form>
    );
  }
}

CommentForm.defaultProps = {
  commentOnArticle: null,
};

CommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  commentOnArticle: PropTypes.func,
  articleSlug: PropTypes.string.isRequired,
};

export default connect(
  null,
  { commentOnArticle },
)(reduxForm({ form: 'comment' })(CommentForm));
