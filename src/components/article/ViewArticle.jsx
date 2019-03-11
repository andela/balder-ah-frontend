import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import toastr from 'toastr';
import { getArticle } from '../../actions/articles';
import { like, unlike } from '../../actions/reactions/like';
import DisplayMessage from '../presentation/DisplayMessage';
import ArticleRating from '../presentation/RateArticles';
import Like from '../presentation/likeButton/Like';
import Bookmark from '../presentation/Bookmark';
import PreLoader from '../presentation/PreLoader';
import Share from '../presentation/shareButton/Share';
import ReadTime from '../presentation/ReadTime';
import CommentForm from '../comment/CommentForm';
import CommentList from '../comment/CommentList';
import './ViewArticle.scss';
import { bookmarkArticle, unbookmarkArticle } from '../../actions/reactions/bookmark';
import FlagArticle from '../presentation/Flag';
import ReportArticleModal from './ReportArticleModal';

class ViewArticle extends React.Component {
  state = {
    loading: true,
    reportArticle: false,
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

  handleBookmarkClick = () => {
    const {
      bookmarkArticle: bookMark,
      unbookmarkArticle: unbookMark,
      article,
      isLoggedIn,
    } = this.props;

    if (isLoggedIn === false) {
      return toastr.error('Please login or signup');
    }

    const { id, bookmarked, slug } = article;
    return bookmarked ? unbookMark(id) : bookMark(slug);
  }

  handleReportArticle = () => {
    const { reportArticle } = this.state;
    this.setState({ reportArticle: !reportArticle });
  }

  render() {
    const { loading, reportArticle } = this.state;
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
      title,
      body,
      imgUrl,
      createdAt,
      bookmarked,
    } = article;

    const { username } = author;
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
          {loading ? (
            <div className={loading === '' ? 'center display-none' : 'center display-block'}>
              {loading && <PreLoader />}
            </div>
          ) : (
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
                    {` ${new Date(createdAt).toDateString()} by `}
                    {username}
                  </p>

                  <div>
                    <ReadTime article={article} />
                  </div>

                  <div className="article-rate" />
                </div>

                <div className="article-main">
                  <p>{body}</p>
                </div>

                <div className="tag-container">
                  <p>
                    <b>
                      {'TAGS: '}
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
                    <Bookmark
                      handleBookmarkClick={this.handleBookmarkClick}
                      article={article}
                      isBookmarked={bookmarked}
                    />
                    <FlagArticle reportArticleCallback={this.handleReportArticle} />
                    <ReportArticleModal
                      toggleModal={reportArticle}
                      onToggleModal={this.handleReportArticle}
                    />
                  </div>
                  <div className="reaction2">
                    {'Rate this article: '}
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
          )}
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
  articleRatingStar: null,
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
  articleRatingStar: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bookmarkArticle: PropTypes.func.isRequired,
  unbookmarkArticle: PropTypes.func.isRequired,
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
  {
    getArticle,
    like,
    unlike,
    bookmarkArticle,
    unbookmarkArticle,
  },
)(withRouter(ViewArticle));
