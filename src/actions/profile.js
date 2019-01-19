import authUtils from '../utils/auth';
import axios from '../utils/axiosInstance';
import * as type from './types';

export const getProfile = () => async (dispatch) => {
  try {
    const token = authUtils.getUserToken();
    const { data } = await axios.get('/user', { headers: { Authorization: token } });
    dispatch({ type: type.GET_USER_PROFILE, payload: { user: data.currentUser } });
  } catch (error) {
    dispatch({
      type: type.GET_USER_PROFILE_FAIL,
      payload: {
        message: error.response ? error.response.data.message : 'something went wrong',
      },
    });
  }
};

export const updateProfile = userData => async (dispatch) => {
  try {
    const token = authUtils.getUserToken();
    const { data } = await axios.put('/user', userData, { headers: { Authorization: token } });

    dispatch({
      type: type.UPDATE_USER_PROFILE,
      payload: {
        message: data.message,
        user: userData,
      },
    });
  } catch (error) {
    dispatch({
      type: type.UPDATE_USER_PROFILE_FAIL,
      payload: {
        message: error.response ? error.response.data.message : 'something went wrong',
      },
    });
  }
};
