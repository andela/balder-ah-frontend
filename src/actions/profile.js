import toast from 'toastr';

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

export const getOtherProfile = username => async (dispatch) => {
  try {
    const { data } = await axios.get(`/profiles/${username}`);
    dispatch({ type: type.GET_OTHER_PROFILE, payload: data });
  } catch (error) {
    const errorMessage = error.response.data.message;
    dispatch({
      type: type.GET_OTHER_PROFILE_FAIL_MSG,
      payload: errorMessage,
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

export const getUserArticles = () => async (dispatch) => {
  try {
    const {
      currentUser: { articles },
    } = (await axios.get('/user')).data;
    return dispatch({ type: type.GET_USER_ARTICLES, payload: { articles } });
  } catch (error) {
    const message = error.response ? error.response.data.message : error.message;
    dispatch({ type: type.GET_USER_ARTICLES_FAIL, payload: { message } });
    return toast.error(message);
  }
};

export const deleteArticle = slug => async (dispatch) => {
  try {
    await axios.delete(`/articles/${slug}`);
    dispatch({ type: type.DELETE_ARTICLE, payload: { slug } });
    return toast.success('Article deleted successfully');
  } catch (error) {
    const message = error.response ? error.response.data.message : error.message;
    dispatch({ type: type.DELETE_ARTICLE_FAIL, payload: { message } });
    return toast.error(message);
  }
};
