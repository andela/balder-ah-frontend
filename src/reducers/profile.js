import * as type from '../actions/types';

const initialState = {
  username: '',
  email: '',
  bio: '',
  image: '',
  rating: '0',
  articles: [],
  isFollowing: null,
  followers: null,
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case type.GET_USER_PROFILE:
      return {
        ...state,
        username: action.payload.user.username,
        email: action.payload.user.email,
        bio: action.payload.user.bio || 'no bio',
        image: action.payload.user.image || 'https://data.whicdn.com/images/132992502/large.jpg',
        rating: action.payload.user.authorRating,
      };
    case type.GET_USER_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload.message,
      };
    case type.UPDATE_USER_PROFILE:
      return {
        ...state,
        username: action.payload.user.username,
        bio: action.payload.user.bio,
        image: action.payload.user.image,
      };
    case type.UPDATE_USER_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload.message,
      };
    case type.GET_OTHER_PROFILE:
      return {
        ...state,
        username: action.payload.userProfile.username,
        email: action.payload.userProfile.email,
        bio: action.payload.userProfile.bio || 'no bio',
        image: action.payload.userProfile.image || 'https://data.whicdn.com/images/132992502/large.jpg',
        rating: action.payload.userProfile.authorRating,
      };
    case type.GET_USER_ARTICLES:
      return {
        ...state,
        articles: action.payload.articles.reverse(),
      };
    case type.GET_USER_ARTICLES_FAIL:
      return {
        ...state,
        error: action.payload.message,
      };
    case type.DELETE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter(article => article.slug !== action.payload.slug),
      };
    case type.DELETE_ARTICLE_FAIL:
      return {
        ...state,
        error: action.payload.message,
      };
    case type.GET_OTHER_PROFILE_FAIL_MSG:
      return {
        ...state,
        error: action.payload,
      };
    case type.GET_OTHER_FOLLOWERS:
      return {
        ...state,
        followers: action.payload,
        isFollowing: action.payload.isFollowing,
      };
    case type.GET_OTHER_FOLLOWERS_FAIL_MSG:
      return {
        ...state,
        error: action.payload,
      };
    case type.FOLLOW:
      return {
        ...state,
        followed: action.payload,
        followers: {
          ...state.followers,
          isFollowing: !state.followers.isFollowing,
        },
        isFollowing: true,
      };
    case type.FOLLOW_FAIL_MSG:
      return {
        ...state,
        error: action.payload,
      };
    case type.UNFOLLOW:
      return {
        ...state,
        unFollowed: action.payload,
        followers: {
          ...state.followers,
          isFollowing: !state.followers.isFollowing,
        },
        isFollowing: false,
      };
    case type.UNFOLLOW_FAIL_MSG:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
