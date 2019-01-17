import {
  SIGN_UP,
  SUCCESS_SIGNUP_MESSAGE,
  ERROR_SIGNUP_MESSAGE,
} from './types';
import axios from '../utils/axiosInstance';
import authUtils from '../utils/auth';

const createUser = signupData => async (dispatch) => {
  try {
    const { data } = await axios.post('users/signup', signupData);

    const { token, message } = data;

    authUtils.saveUserToken(token);

    dispatch({ type: SIGN_UP, payload: data });
    dispatch({ type: SUCCESS_SIGNUP_MESSAGE, payload: message });
  } catch ({ response }) {
    const errorMessage = response.data.errors.body;
    dispatch({ type: ERROR_SIGNUP_MESSAGE, payload: errorMessage });
  }
};

export default createUser;
