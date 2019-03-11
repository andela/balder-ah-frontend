import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Comment from './Comment';
import { getArticleComments } from '../../actions/articles';

class CommentList extends Component {
  async componentDidMount() {
    const { articleSlug, getArticleComments: getComments } = this.props;
    await getComments(articleSlug);
  }

  render() {
    const { comments, articleSlug } = this.props;

    if (comments && !comments.length) return null;
    return (
      <div className="comment-list">
        <h5>Comments</h5>
        { comments.map(comment => (
          <Comment
            articleSlug={articleSlug}
            key={comment.id}
            comment={comment}
          />
        ))}
      </div>
    );
  }
}

CommentList.defaultProps = {
  comments: [],
};

CommentList.propTypes = {
  articleSlug: PropTypes.string.isRequired,
  comments: PropTypes.oneOfType([PropTypes.array]),
};

const mapStateToProps = ({ article: { selectedArticle: { comments } } }) => ({
  comments,
});

export default connect(mapStateToProps, { getArticleComments })(CommentList);
