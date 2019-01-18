import axios from '../utils/axiosInstance';
import { LOG_IN } from './types';
import authUtils from '../utils/auth';

const login = formData => async (dispatch) => {
  try {
    const { data } = await axios.post('/users/login', formData);
    authUtils.saveUserToken(data.token);
    dispatch({ type: LOG_IN, payload: data });
    return null;
  } catch ({
    response: {
      data: { message },
    },
  }) {
    dispatch({ type: LOG_IN });
    return message;
  }
};

export default login;
