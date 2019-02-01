import { GET_NOTIFICATIONS, NEW_NOTIFICATION } from '../actions/types';

const initialState = {
  notifications: [],
  newNotification: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    case NEW_NOTIFICATION:
      return { ...state, newNotification: action.payload };
    default:
      return state;
  }
};
