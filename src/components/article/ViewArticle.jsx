import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getArticle } from '../../actions/articles';
import DisplayMessage from '../presentation/DisplayMessage';
import './ViewArticle.scss';
import Like from '../presentation/likeButton/Like';
import { like, unlike } from '../../actions/reactions/like';

class ViewArticle extends React.Component {
  state={
    loading: 'https://i.imgur.com/ungt2Pg.gif',
  };

  componentDidMount = async () => {
    const { match: { params }, getArticle: viewArticle } = this.props;
    await viewArticle(params.slug);
    this.setState({ loading: '' });
  }

  handleFavoriteClick = () => {
    const {
      like: likeArticle, unlike: unlikeArticle, isLike,
    } = this.props;
    const { match: { params: { slug } } } = this.props;
    const articleSlug = slug;

    return isLike ? unlikeArticle(articleSlug) : likeArticle(articleSlug);
  }

  render() {
    const { loading } = this.state;
    const {
      tags,
      message,
      article,
      author,
      isLike,
    } = this.props;

    const {
      title,
      body,
      imgUrl,
      readtime,
      createdAt,
    } = article;
    const { username } = author;
    const date = new Date(createdAt).toDateString();
    return (
      <div>
        <div className="img-container">
          <div>
            <img src={!imgUrl ? process.env.REACT_APP_DEFAULT_ARTICLE_IMAGE : imgUrl} alt={!imgUrl ? 'article' : `${title}`} />
          </div>
        </div>

        <div className="article-container container">
          <div className={loading === '' ? 'center display-none' : 'center display-block'}>
            <img alt="loading" src={loading} className="center" />
          </div>

          <DisplayMessage
            message={message}
          />

          <div className="top-details">
            <h1 className="title">{title}</h1>
            <p className="article-date-author">
              {date}
            &nbsp;by &nbsp;
              {username}
            </p>

            <div className="read-time">
              <i className="little material-icons icon">schedule</i>
              <p>
                &nbsp;
                {readtime}
                &nbsp;
                read
              </p>
            </div>

            <div className="article-rate" />
          </div>

          <div className="article-main">
            <p>{body}</p>
          </div>

          <div className="tag-container">
            <p>
              <b>
                TAGS:&nbsp;
              </b>
              {tags ? tags.map(tag => `${tag}, `) : ''}
            </p>
          </div>

          <div className="icon-container">
            <Like
              handleClick={this.handleFavoriteClick}
              likeButtonStyle={this.likeButtonStyle}
              article={this.props}
              isLike={isLike}
            />
          </div>

        </div>
      </div>
    );
  }
}

ViewArticle.defaultProps = {
  tags: '' || [],
  getArticle: null,
  author: null,
};

ViewArticle.propTypes = {
  getArticle: PropTypes.func,
  tags: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  message: PropTypes.string.isRequired,
  article: PropTypes.oneOfType([PropTypes.number,
    PropTypes.string,
    PropTypes.array,
    PropTypes.object]).isRequired,
  author: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  match: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  like: PropTypes.func.isRequired,
  unlike: PropTypes.func.isRequired,
  isLike: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth && state.auth.isLoggedIn ? state.auth.isLoggedIn : false,
  message: state.article && state.article.response.message ? state.article.response.message : '',
  article: state.article && state.article.response.getOneArticle ? state.article.response.getOneArticle : '',
  author: state.article && state.article.response.getOneArticle ? state.article.response.getOneArticle.author : '',
  tags: state.article && state.article.response.getOneArticle ? state.article.response.getOneArticle.tags : '',
  isLike: state.article && state.article.response.getOneArticle ? state.article.isLike : false,
});

export default connect(mapStateToProps, { getArticle, like, unlike })(ViewArticle);
