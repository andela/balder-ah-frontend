import axios from '../../utils/axiosInstance';
import {
  FOLLOW,
  FOLLOW_FAIL_MSG,
  UNFOLLOW,
  UNFOLLOW_FAIL_MSG,
  GET_OTHER_FOLLOWERS,
  GET_OTHER_FOLLOWERS_FAIL_MSG,
} from '../types';

export const follow = username => async (dispatch) => {
  try {
    const { data } = await axios.post(`/profiles/${username}/follow`);
    dispatch({ type: FOLLOW, payload: data });
  } catch (error) {
    const errorMessage = error.response.data.errors.body;
    dispatch({ type: FOLLOW_FAIL_MSG, payload: errorMessage });
  }
};

export const unFollow = username => async (dispatch) => {
  try {
    const { data } = await axios.post(`/profiles/${username}/unfollow`);
    dispatch({ type: UNFOLLOW, payload: data });
  } catch (error) {
    const errorMessage = error.response.data.errors.body;
    dispatch({ type: UNFOLLOW_FAIL_MSG, payload: errorMessage });
  }
};

export const getUserFollowers = username => async (dispatch) => {
  try {
    const { data } = await axios.get(`profiles/${username}/followers`);
    dispatch({ type: GET_OTHER_FOLLOWERS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_OTHER_FOLLOWERS_FAIL_MSG,
      payload: error.response,
    });
  }
};
