import { AUTHENTICATE_USER } from './types';
import axios from '../utils/axiosInstance';
import authUtils from '../utils/auth';

export const getLoggedInUser = () => async (dispatch) => {
  try {
    const {
      data: { currentUser: user },
    } = await axios.get('/user');
    window.localStorage.setItem('loggedUser', user.username);
    dispatch({ type: AUTHENTICATE_USER, payload: { user } });
  } catch (error) {
    dispatch({ type: AUTHENTICATE_USER });
  }
};

export const login = formData => async (dispatch) => {
  try {
    const { data } = await axios.post('/users/login', formData);
    authUtils.saveUserToken(data.token);
    dispatch({ type: AUTHENTICATE_USER, payload: data });
    await getLoggedInUser()(dispatch);
    return null;
  } catch ({
    response: {
      data: { message },
    },
  }) {
    dispatch({ type: AUTHENTICATE_USER });
    return message;
  }
};
