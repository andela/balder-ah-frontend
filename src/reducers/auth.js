import { LOG_IN, SOCIAL_AUTH } from '../actions/types';

export default (state = null, action) => {
  const { payload, type } = action;

  switch (type) {
    case LOG_IN:
      return payload ? { isLoggedIn: true } : { isLogged: false };
    case SOCIAL_AUTH:
      return { isLoggedIn: true };
    default:
      return state;
  }
};
