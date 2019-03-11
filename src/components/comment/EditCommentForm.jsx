import React from 'react';
import PropTypes from 'prop-types';
import Textarea from '../presentation/TextArea';
import Button from '../presentation/Button';
import './EditCommentForm.scss';

const EditCommentForm = (props) => {
  const {
    comment, handleCancelEdit, handleSaveEdit, handleEditValueChange,
  } = props;

  return (
    <form className="edit-comment">
      <Textarea
        autoFocus
        value={comment}
        name="edit-comment"
        onChange={handleEditValueChange}
        className="edit-comment-box"
      />
      <div className="edit-comment-btns">
        <Button handleClick={handleCancelEdit} className="edit-comment-cancel" title="Cancel" />
        <Button handleClick={handleSaveEdit} className="edit-comment-save" title="Save changes" />
      </div>
    </form>
  );
};

EditCommentForm.defaultProps = {
  comment: '',
  handleCancelEdit: null,
  handleSaveEdit: null,
  handleEditValueChange: null,
};

EditCommentForm.propTypes = {
  comment: PropTypes.string,
  handleCancelEdit: PropTypes.func,
  handleSaveEdit: PropTypes.func,
  handleEditValueChange: PropTypes.func,
};

export default EditCommentForm;
