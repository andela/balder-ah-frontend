import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import ArticleForm from './ArticleForm';
import DisplayMessage from '../presentation/DisplayMessage';
import { createNewArticle } from '../../actions/articles';

class CreateArticle extends React.Component {
  state = {
    title: '',
    body: '',
    description: '',
    tags: [],
    imgUrl: '',
    message: false,
  };

  onSubmit = async (formState) => {
    const { createNewArticle: addNewArticle, history } = this.props;

    await this.setState({
      title: formState.title,
      body: formState.body,
      description: formState.description,
      tags: formState.tags,
      imgUrl: formState.imgUrl,
    });

    await addNewArticle(this.state);
    const { slug, message } = this.props;
    this.setState({ message });

    const articleslug = `/articles/${slug}`;

    if (typeof message === 'string') {
      history.push(articleslug);
    }
  };

  render() {
    const { message } = this.state;
    const { isLoggedIn } = this.props;

    if (isLoggedIn === null) return null;
    if (!isLoggedIn) return <Redirect to="/login" />;

    return (
      <div>
        <div className="container">
          <div className="form-header">
            <h2>Create your article</h2>
          </div>
          <DisplayMessage message={message} onSubmit={this.onSubmit} />
          <ArticleForm handleSubmit={this.onSubmit} btnValue="create Article" actionType="create" />
        </div>
      </div>
    );
  }
}

CreateArticle.defaultProps = {
  message: '' || [],
  createNewArticle: null,
  isLoggedIn: null,
  history: null,
};

CreateArticle.propTypes = {
  isLoggedIn: PropTypes.bool,
  history: PropTypes.oneOfType([PropTypes.object]),
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  createNewArticle: PropTypes.func,
};

const mapStateToProps = ({ auth, article }) => ({
  isLoggedIn: auth.isLoggedIn,
  message: article && article.response.message ? article.response.message : '',
  slug: article && article.response.newArticle ? article.response.newArticle.slug : '',
});

export default connect(
  mapStateToProps,
  { createNewArticle },
)(withRouter(CreateArticle));
