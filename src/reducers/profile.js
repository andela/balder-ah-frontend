import * as type from '../actions/types';

const initialState = {
  username: '',
  email: '',
  bio: '',
  image: '',
  rating: '0',
  articles: [],
  error: '',
  emailNotification: false,
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
        emailNotification: action.payload.user.emailNotification,
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
    case type.OPT_IN:
      return {
        ...state,
        emailNotification: true,
      };
    case type.OPT_OUT:
      return {
        ...state,
        emailNotification: false,
      };
    default:
      return state;
  }
};
