import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getArticle } from '../../actions/articles';
import DisplayMessage from '../presentation/DisplayMessage';
import CommentForm from '../comment/CommentForm';
import ArticleRating from '../presentation/RateArticles';
import './ViewArticle.scss';
import Like from '../presentation/likeButton/Like';
import { like, unlike } from '../../actions/reactions/like';
import PreLoader from '../presentation/PreLoader';
import CommentList from '../comment/CommentList';
import Share from '../presentation/shareButton/Share';

class ViewArticle extends React.Component {
  state = {
    loading: true,
  };

  componentDidMount = async () => {
    const {
      match: { params },
      getArticle: viewArticle,
    } = this.props;
    await viewArticle(params.slug);
    const { message, history } = this.props;

    this.setState({ loading: false });
    if (typeof message !== 'string') {
      setTimeout(() => {
        history.push('/');
      }, 3000);
    }
  }

  handleFavoriteClick = () => {
    const { like: likeArticle, unlike: unlikeArticle, isLike } = this.props;
    const {
      match: {
        params: { slug },
      },
    } = this.props;
    const articleSlug = slug;
    return isLike ? unlikeArticle(articleSlug) : likeArticle(articleSlug);
  };

  render() {
    const { loading } = this.state;
    const {
      tags,
      message,
      article,
      author,
      isLike,
      isLoggedIn,
      match: {
        params: { slug },
      },
      articleRatingStar,
    } = this.props;
    const {
      title, body, imgUrl, readtime, createdAt,
    } = article;
    const { username } = author;
    const date = new Date(createdAt).toDateString();
    const articleSlug = slug;
    return (
      <div>
        <div className="img-container">
          <div>
            <img
              src={!imgUrl ? process.env.REACT_APP_DEFAULT_ARTICLE_IMAGE : imgUrl}
              alt={!imgUrl ? 'article' : `${title}`}
            />
          </div>
        </div>

        <div className="article-container container">

          <div className={loading === '' ? 'center display-none' : 'center display-block'}>
            {loading && <PreLoader />}
          </div>
          <Fragment>
            <DisplayMessage
              message={message}
            />
            <div className={typeof message !== 'string' ? 'center display-block' : 'center display-none'}>
              <h2>{message.toString()}</h2>
              <p>redirecting back to homepage...</p>
            </div>
            <div className={typeof message === 'string' ? 'display-block' : 'display-none'}>
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
                <div className="reaction1">
                  <Like
                    handleClick={this.handleFavoriteClick}
                    likeButtonStyle={this.likeButtonStyle}
                    article={this.props}
                    isLike={isLike}
                  />
                  <Share
                    articleSlug={articleSlug}
                    articleTitle={title}
                  />
                </div>
                <div className="reaction2">
                  Rate this article: &nbsp;
                  <ArticleRating
                    articleRatingStar={Number(articleRatingStar)}
                    slug={slug}
                  />
                </div>
              </div>
              <hr />
              <div className="article-comments">
                {isLoggedIn ? (
                  <CommentForm articleSlug={slug} />
                ) : (
                  <p>
                    {'Please '}
                    <Link to="/login">log in</Link>
                    {' to comment'}
                  </p>
                )}
                <CommentList articleSlug={slug} />
              </div>
            </div>
          </Fragment>
        </div>
      </div>
    );
  }
}

ViewArticle.defaultProps = {
  tags: '' || [],
  getArticle: null,
  author: null,
  match: null,
  isLoggedIn: null,
};

ViewArticle.propTypes = {
  getArticle: PropTypes.func,
  tags: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  article: PropTypes.oneOfType([PropTypes.number,
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  author: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  isLoggedIn: PropTypes.bool,
  match: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  like: PropTypes.func.isRequired,
  unlike: PropTypes.func.isRequired,
  isLike: PropTypes.bool.isRequired,
  articleRatingStar: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

const mapStateToProps = ({ auth, article }) => ({
  isLoggedIn: auth && auth.isLoggedIn ? auth.isLoggedIn : false,
  message: article && article.response.message ? article.response.message : '',
  article: article && article.response.getOneArticle ? article.response.getOneArticle : '',
  author: article && article.response.getOneArticle ? article.response.getOneArticle.author : '',
  tags: article && article.response.getOneArticle ? article.response.getOneArticle.tags : '',
  isLike: article && article.response.getOneArticle ? article.isLike : false,
  articleRatingStar: article && article.response.getOneArticle ? article
    .response.getOneArticle.articleRatingStar : 0,
  slug: article && article.response.getOneArticle ? article.response.getOneArticle.slug : '',
});

export default connect(
  mapStateToProps,
  { getArticle, like, unlike },
)(ViewArticle);
