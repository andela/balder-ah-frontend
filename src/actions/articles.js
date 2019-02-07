import toastr from 'toastr';
import axios from '../utils/axiosInstance';
import {
  CREATE_ARTICLE,
  ERROR_CREATE_ARTICLE,
  VIEW_ARTICLE,
  VIEW_ARTICLE_ERROR,
  GET_ARTICLE_COMMENTS,
  COMMENT_ON_ARTICLE,
  GET_ALL_ARTICLES,
  GET_ALL_ARTICLES_FAILURE_MSG,
  GET_ALL_ARTICLES_SUCCESS_MSG,
  EDIT_COMMENT,
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
    const errorMessage = [response.data.message];
    dispatch({ type: VIEW_ARTICLE_ERROR, payload: errorMessage });
  }
};

export const getArticleComments = articleSlug => async (dispatch) => {
  try {
    const { data } = await axios.get(`/articles/${articleSlug}/comments`);
    dispatch({ type: GET_ARTICLE_COMMENTS, payload: data.comments });
  } catch (error) {
    dispatch({ type: GET_ARTICLE_COMMENTS, payload: null });
  }
};

export const commentOnArticle = (articleSlug, comment) => async (dispatch) => {
  try {
    await axios.post(`/articles/${articleSlug}/comments`, { body: comment });
    dispatch({ type: COMMENT_ON_ARTICLE });
    return getArticleComments(articleSlug)(dispatch);
  } catch (error) {
    dispatch({ type: COMMENT_ON_ARTICLE });
    toastr.error('Failed to comment.');
    return null;
  }
};

export const getArticles = pageNumber => async (dispatch) => {
  try {
    const pageQuery = pageNumber ? `?page=${pageNumber}` : '';
    const response = await axios.get(`/articles${pageQuery}`);
    const {
      allArticles, message, pageCount, allTheArticles,
    } = response.data;
    dispatch({ type: GET_ALL_ARTICLES, payload: { data: allArticles, pageCount, allTheArticles } });
    dispatch({ type: GET_ALL_ARTICLES_SUCCESS_MSG, payload: message });
  } catch (error) {
    const errorMessage = error.response.data.errors.body;
    dispatch({ type: GET_ALL_ARTICLES_FAILURE_MSG, payload: errorMessage });
  }
};

export const editComment = (editedComment, id, articleSlug) => async (dispatch) => {
  try {
    await axios.put(`/articles/${articleSlug}/comments/${id}`, { body: editedComment });
    dispatch({ type: EDIT_COMMENT, payload: { body: editedComment, id } });
  } catch (error) {
    toastr.error('Failed to edit comment.');
  }
};
