import {
  CREATE_ARTICLE,
  ERROR_CREATE_ARTICLE,
  VIEW_ARTICLE,
  VIEW_ARTICLE_ERROR,
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
      };
    case VIEW_ARTICLE_ERROR:
      return {
        ...state,
        response: { message: action.payload },
      };
    default:
      return state;
  }
};
