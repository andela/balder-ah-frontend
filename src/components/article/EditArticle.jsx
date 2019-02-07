import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import ArticleForm from './ArticleForm';
import DisplayMessage from '../presentation/DisplayMessage';
import { getArticle, editArticle } from '../../actions/articles';
import PreLoader from '../presentation/PreLoader';


class EditArticle extends React.Component {
  state = {
    title: '',
    body: '',
    tags: [],
    imgUrl: '',
    message: false,
    isFetching: true,
  };

  async componentDidMount() {
    const { article, getArticle: getArticleToEdit, match: { params: { slug } } } = this.props;
    await getArticleToEdit(slug);
    await this.setState({
      title: article.title,
      body: article.body,
      tags: article.tags,
      isFetching: false,
    });
  }

  onSubmit = async (formState) => {
    try {
      const { editArticle: updateArticle, history, match: { params: { slug } } } = this.props;

      await this.setState({
        title: formState.title,
        body: formState.body,
        tags: formState.tags,
        imgUrl: formState.imgUrl,
      });
      await updateArticle(slug, this.state);
      const articleslug = `/articles/${slug}`;
      return history.push(articleslug);
    } catch (error) {
      return null;
    }
  };

  render() {
    const {
      message,
      isFetching,
    } = this.state;
    const { isLoggedIn, article } = this.props;
    const articleTags = article.tags ? article.tags.join() : '';
    if (isLoggedIn === null) return null;
    if (!isLoggedIn) return <Redirect to="/login" />;
    if (isFetching) {
      return (
        <div className="center display-block">
          <PreLoader />
        </div>
      );
    }

    return (
      <div>
        <div className="container">
          <div className="form-header">
            <h2>Edit your article</h2>
          </div>
          <DisplayMessage message={message} onSubmit={this.onSubmit} />
          <ArticleForm title={article.title} handleSubmit={this.onSubmit} btnValue="Edit Article" actionType="edit" body={article.body} tags={articleTags} />
        </div>
      </div>
    );
  }
}

EditArticle.defaultProps = {
  editArticle: null,
  isLoggedIn: null,
  history: null,
  article: null,
};

EditArticle.propTypes = {
  isLoggedIn: PropTypes.bool,
  history: PropTypes.oneOfType([PropTypes.object]),
  editArticle: PropTypes.func,
  article: PropTypes.oneOfType([PropTypes.object]),
};

const mapStateToProps = ({ auth, article }) => ({
  isLoggedIn: auth && auth.isLoggedIn ? auth.isLoggedIn : null,
  article: article && article.response.getOneArticle ? article.response.getOneArticle : '',
});

export default connect(
  mapStateToProps,
  { editArticle, getArticle },
)(withRouter(EditArticle));
