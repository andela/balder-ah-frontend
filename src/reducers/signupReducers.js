import {
  SIGN_UP,
  SUCCESS_SIGNUP_MESSAGE,
  ERROR_SIGNUP_MESSAGE,
} from '../actions/types';

const initialState = {
  response: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        response: action.payload,
      };
    case SUCCESS_SIGNUP_MESSAGE:
      return {
        ...state,
        response: action.payload,
      };
    case ERROR_SIGNUP_MESSAGE:
      return {
        ...state,
        response: action.payload,
      };
    default:
      return state;
  }
};
