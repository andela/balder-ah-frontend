import React from 'react';
import PropTypes from 'prop-types';
import StarRating from 'react-star-ratings';
import './ProfileCard.scss';

const ProfileCard = ({
  username,
  bio,
  image,
  rating,
  buttonText,
  buttonCallback,
}) => (
  <div className="profile-card">
    <div className="profile-card__left">
      <img className="circle responsive-image profile-image" src={image} alt={username} />
    </div>
    <div className="profile-card__right">
      <h3>{username}</h3>
      <p>{bio}</p>
      <br />
      <StarRating
        rating={rating}
        numberOfStars={5}
        starRatedColor="black"
        starDimension="30px"
        starSpacing="2px"
      />
    </div>
    <button className="btn" type="button" onClick={buttonCallback}>
      {buttonText}
    </button>
  </div>
);

ProfileCard.propTypes = {
  username: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonCallback: PropTypes.func.isRequired,
};

export default ProfileCard;
