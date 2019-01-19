import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
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
  }

  componentDidMount() {
    const { isLoggedIn, history } = this.props;
    if (isLoggedIn === false || null) {
      history.push('/login');
    }
  }

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
      setTimeout(() => {
        history.push(articleslug);
      }, 1000);
    }
  }

  render() {
    const { message } = this.state;
    return (
      <div>
        <div className="container">
          <div className="form-header">
            <h2>
              Create your article
            </h2>
          </div>
          <DisplayMessage
            message={message}
            onSubmit={this.onSubmit}
          />
          <ArticleForm handleSubmit={this.onSubmit} btnValue="create Article" actionType="create" />
        </div>
      </div>
    );
  }
}

CreateArticle.defaultProps = {
  message: '' || [],
  createNewArticle: null,
  isLoggedIn: false,
  history: null,
};

CreateArticle.propTypes = {
  isLoggedIn: PropTypes.bool,
  history: PropTypes.oneOfType([PropTypes.object]),
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  createNewArticle: PropTypes.func,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth && state.auth.isLoggedIn ? state.auth.isLoggedIn : false,
  message: state.article && state.article.response.message ? state.article.response.message : '',
  slug: state.article && state.article.response.newArticle ? state.article.response.newArticle.slug : '',
});

export default connect(mapStateToProps, { createNewArticle })(withRouter(CreateArticle));
