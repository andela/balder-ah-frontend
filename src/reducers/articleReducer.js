import {
  CREATE_ARTICLE,
  ERROR_CREATE_ARTICLE,
  VIEW_ARTICLE,
  VIEW_ARTICLE_ERROR,
  LIKE,
  UNLIKE,
  LIKE_ERROR,
  GET_ARTICLE_COMMENTS,
  COMMENT_ON_ARTICLE,
} from '../actions/types';

const initialState = {
  response: '',
  selectedArticle: { comments: [] },
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_ARTICLE:
      return {
        ...state,
        response: payload,
      };
    case ERROR_CREATE_ARTICLE:
      return {
        ...state,
        response: { message: payload },
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
        response: { message: payload },
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
    case GET_ARTICLE_COMMENTS:
      return payload
        ? { ...state, selectedArticle: { ...state.selectedArticle, comments: payload } }
        : { ...state };
    case COMMENT_ON_ARTICLE:
      return { ...state };
    default:
      return state;
  }
};
