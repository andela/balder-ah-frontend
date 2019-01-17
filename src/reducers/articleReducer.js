import {
  CREATE_ARTICLE,
  ERROR_CREATE_ARTICLE,
  VIEW_ARTICLE,
  VIEW_ARTICLE_ERROR,
  LIKE,
  UNLIKE,
  LIKE_ERROR,
} from '../actions/types';

const initialState = {
  response: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ARTICLE:
      return {
        ...state,
        response: action.payload,
      };
    case ERROR_CREATE_ARTICLE:
      return {
        ...state,
        response: { message: action.payload },
      };
    case VIEW_ARTICLE:
      return {
        ...state,
        response: action.payload,
        isLike: action.payload.getOneArticle.favorited,
      };
    case VIEW_ARTICLE_ERROR:
      return {
        ...state,
        response: { message: action.payload },
      };
    case LIKE:
      return {
        ...state,
        type: action.type,
        isLike: true,
      };
    case UNLIKE:
      return {
        ...state,
        type: action.type,
        isLike: false,
      };
    case LIKE_ERROR:
      return {
        ...state,
        type: action.type,
        likeError: action.error,
      };
    default:
      return state;
  }
};
