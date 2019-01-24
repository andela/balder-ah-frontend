import axios from '../utils/axiosInstance';
import {
  CREATE_ARTICLE,
  ERROR_CREATE_ARTICLE,
  VIEW_ARTICLE,
  VIEW_ARTICLE_ERROR,
} from './types';
import authUtils from '../utils/auth';

export const createNewArticle = articleData => async (dispatch) => {
  try {
    const userToken = authUtils.getUserToken();
    axios.defaults.headers.common.Authorization = userToken;
    const { data } = await axios.post('/articles', articleData);
    dispatch({ type: CREATE_ARTICLE, payload: data });
  } catch ({ response }) {
    const errorMessage = response.data.errors.body;
    dispatch({ type: ERROR_CREATE_ARTICLE, payload: errorMessage });
  }
};

export const getArticle = articleSlug => async (dispatch) => {
  try {
    const userToken = authUtils.getUserToken();
    axios.defaults.headers.common.Authorization = userToken;
    const { data } = await axios.get(`/articles/${articleSlug}`);
    dispatch({ type: VIEW_ARTICLE, payload: data });
  } catch ({ response }) {
    const errorMessage = response.data.errors.body;
    dispatch({ type: VIEW_ARTICLE_ERROR, payload: errorMessage });
  }
};
