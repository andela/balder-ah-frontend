import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import ProfileCard from './ProfileCard';
import BigArticleCard from '../presentation/BigArticleCard';
import UserTopArticles from './UserTopArticles';
import SmallArticleCard from '../presentation/SmallArticleCard';
import { getOtherProfile } from '../../actions/profile';
import { follow, unFollow, getUserFollowers } from '../../actions/reactions/follow';

class FollowAuthor extends Component {
  componentDidMount() {
    this.getUserProfile();
  }

  getUserProfile = async () => {
    const {
      getOtherProfile: getProfile,
      getUserFollowers: getFollowers,
      history,
      error,
    } = this.props;
    const {
      match: {
        params: { username },
      },
    } = this.props;

    if (localStorage.getItem('loggedUser') === username) {
      return history.push('/profile');
    }

    await getProfile(username);
    await getFollowers(username);
    if (error) return history.push('/login');
    return null;
  };

  handleFollow = () => {
    const {
      follow: followUser, unFollow: unFollowUser, username, isFollowing,
    } = this.props;

    if (isFollowing) {
      toastr.success(`you have just unfollowed ${username}`);
    }
    if (!isFollowing) {
      toastr.success(`you have just followed ${username}`);
    }

    return isFollowing ? unFollowUser(username) : followUser(username);
  };

  render() {
    const {
      username, bio, image, rating, isFollowing,
    } = this.props;
    return (
      <section className="container">
        {username && (
          <ProfileCard
            username={username}
            bio={bio}
            image={image}
            rating={Number(rating)}
            buttonText={isFollowing ? 'Unfollow' : 'Follow'}
            buttonCallback={this.handleFollow}
          />
        )}

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

FollowAuthor.propTypes = {
  getOtherProfile: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  image: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  match: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  follow: PropTypes.func.isRequired,
  unFollow: PropTypes.func.isRequired,
  isFollowing: PropTypes.bool,
  error: PropTypes.string,
};

FollowAuthor.defaultProps = {
  error: '',
  isFollowing: null,
};

const mapStateToProps = state => ({
  username: state.profile.username,
  rating: state.profile.rating,
  bio: state.profile.bio,
  image: state.profile.image,
  email: state.profile.email,
  isFollowed: state.profile.isFollowed,
  followers: state.profile.followers,
  following: state.profile.following,
  isFollowing: state.profile.isFollowing,
  error: state.profile.error,
});

export default connect(
  mapStateToProps,
  {
    getOtherProfile,
    getUserFollowers,
    follow,
    unFollow,
  },
)(FollowAuthor);
