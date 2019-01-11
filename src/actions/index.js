import axios from '../utils/axiosInstance';
import types from './types';
import authUtils from '../utils/auth';

const { LOG_IN } = types;

export const demo = () => {};

export const login = formData => dispatch => axios
  .post('/users/login', formData)
  .then(({ data }) => {
    authUtils.saveUserToken(data.token);
    dispatch({ type: LOG_IN, payload: data });
  })
  .catch(
    ({
      response: {
        data: { message },
      },
    }) => message,
  );
