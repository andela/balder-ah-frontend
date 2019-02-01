import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Profile.scss';
import ProfileCard from './ProfileCard';
import EditProfileModal from './EditProfileModal';
import BigArticleCard from '../presentation/BigArticleCard';
import SmallArticleCard from '../presentation/SmallArticleCard';
import UserTopArticles from './UserTopArticles';
import { getProfile } from '../../actions/profile';
import ToggleNotification from '../presentation/toggleButton/ToggleNotification';
import { optOutNotification, optInNotification } from '../../actions/optInOut';

/**
 * @class
 * @description - Profile component
 * @returns {JSX} - rendered output
 */
export class Profile extends Component {
  /**
   * @constructor
   * @param {*} props - react props
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this.onEditProfile = this.onEditProfile.bind(this);
  }

  state = {
    editProfile: false,
  };


  /**
   * @method
   * @description - react lifecycle method
   * @returns {void}
   */
  componentDidMount() {
    this.getUserProfile();
  }


  onChange = () => {
    const { inEmail, optInNotification: optIn, optOutNotification: optOut } = this.props;
    return inEmail ? optOut() : optIn();
  }

  /**
   * @method
   * @description - runs when user clicks edit profile button
   * @returns {void}
   */
  onEditProfile() {
    const { editProfile } = this.state;
    this.setState({ editProfile: !editProfile });
  }

  /**
   * @property
   * @description - dispatches action to get user profile
   * @returns {null} - no usable response
   */
  getUserProfile = async () => {
    const { getProfile: getUserProfile } = this.props;
    await getUserProfile();
    const { error, history } = this.props;
    if (error) return history.push('/login');
    return null;
  };

  /**
   * @method
   * @description renders the component to the screen
   * @returns {JSX} - output
   */
  render() {
    const {
      username,
      bio,
      image,
      rating,
      inEmail,
    } = this.props;
    const { editProfile } = this.state;


    return (
      <section className="container">
        <ProfileCard
          username={username}
          bio={bio}
          image={image}
          rating={Number(rating)}
          buttonText="edit"
          buttonCallback={this.onEditProfile}
        />
        <EditProfileModal
          toggleModal={editProfile}
          onToggleModal={this.onEditProfile}
        />
        <ToggleNotification
          emailNotificationStatus={inEmail}
          onChange={this.onChange}
          name="email"
        />
        <br />
        <br />
        <UserTopArticles />
        <br />
        <br />
        <h4>Favorites</h4>
        <div className="user-favorites row">
          <br />
          <BigArticleCard />
          <BigArticleCard />
          <BigArticleCard />
        </div>
        <br />
        <br />
        <h4>Bookmarked</h4>
        <div className="user-bookmarks row">
          <br />
          <SmallArticleCard />
          <SmallArticleCard />
        </div>
      </section>
    );
  }
}

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  optInNotification: PropTypes.func.isRequired,
  optOutNotification: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  image: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  inEmail: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

Profile.defaultProps = {
  error: '',
};

const mapStateToProps = state => ({
  username: state.profile.username,
  rating: state.profile.rating,
  bio: state.profile.bio,
  image: state.profile.image,
  email: state.profile.email,
  error: state.profile.error,
  inEmail: state.profile.emailNotification,
});

export default connect(
  mapStateToProps,
  { getProfile, optInNotification, optOutNotification },
)(Profile);
