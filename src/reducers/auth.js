import types from '../actions/types';

const { LOG_IN } = types;

export default (state = null, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...action.payload, isLoggedIn: true };
    default:
      return state;
  }
};
