import { LOG_IN } from '../actions/types';

export default (state = null, action) => {
  const { payload, type } = action;

  switch (type) {
    case LOG_IN:
      return payload ? { isLoggedIn: true } : { isLogged: false };
    default:
      return state;
  }
};
