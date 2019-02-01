import {
  SOCIAL_AUTH,
  AUTHENTICATE_USER,
  PASSWORD_RESET,
  UPDATE_PASSWORD,
} from '../actions/types';

const initialState = { user: null, isLoggedIn: null };
export default (state = initialState, action) => {
  const { type, payload = null } = action;

  switch (type) {
    case SOCIAL_AUTH:
      return { isLoggedIn: true };
    case AUTHENTICATE_USER:
      return payload ? { ...payload, isLoggedIn: true } : { user: null, isLoggedIn: false };
    case PASSWORD_RESET:
      return { ...state, response: payload };
    case UPDATE_PASSWORD:
      return { ...state, updatePassword: payload };
    default:
      return state;
  }
};
