import React, { Component } from 'react';
import StarRating from 'react-star-ratings';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import postArticleRating from '../../actions/rating';
import './Ratings.scss';

class ArticleRating extends Component {
  state = {
    currentRating: '',
  }

  handleRatingClick = async (eventValue) => {
    const { isLoggedIn } = this.props;

    if (!isLoggedIn) {
      return false;
    }

    this.setState({ currentRating: eventValue });

    const ratingInput = eventValue.toString();
    const ratingValue = {
      rating: ratingInput,
    };

    const {
      postArticleRating: postNewRating, slug,
    } = this.props;

    await postNewRating(ratingValue, slug);
    return false;
  }

  render() {
    const { isLoggedIn } = this.props;
    const { articleRatingStar } = this.props;
    const { currentRating } = this.state;
    return (
      <div className="rating-box">
        <StarRating
          name="rating"
          starRatedColor="black"
          size={20}
          numberOfStars={5}
          rating={!currentRating ? Number(articleRatingStar) : currentRating}
          changeRating={this.handleRatingClick}
          starDimension="20px"
          starSpacing="0px"
        />
        <p className="rating-response">
          {
            !isLoggedIn ? 'Please login to add a rating' : currentRating && `You rated a ${currentRating}`
          }
        </p>
      </div>
    );
  }
}

ArticleRating.defaultProps = {
  articleRatingStar: '',
};

ArticleRating.propTypes = {
  articleRatingStar: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps, { postArticleRating })(ArticleRating);
