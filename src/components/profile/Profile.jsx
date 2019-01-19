import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Profile.scss';
import Nav from '../presentation/Nav';
import TrendingTags from '../presentation/TrendingTags';
import ProfileCard from './ProfileCard';
import EditProfileModal from './EditProfileModal';
import BigArticleCard from '../presentation/BigArticleCard';
import SmallArticleCard from '../presentation/SmallArticleCard';
import UserTopArticles from './UserTopArticles';
import Footer from '../presentation/Footer';
import { getProfile } from '../../actions/profile';

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
      email,
    } = this.props;
    const { editProfile } = this.state;

    return (
      <Fragment>
        <Nav />
        <br />
        <TrendingTags />
        <br />
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
            username={username}
            bio={bio}
            image={image}
            email={email}
            toggleModal={editProfile}
            onToggleModal={this.onEditProfile}
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
        <br />
        <br />
        <Footer />
      </Fragment>
    );
  }
}

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  image: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
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
});

export default connect(
  mapStateToProps,
  { getProfile },
)(Profile);
