import toastr from 'toastr';
import axios from '../../utils/axiosInstance';

import {
  BOOKMARK,
  BOOKMARK_ERROR,
  BOOKMARK_ON_ALL,
  UNBOOKMARK,
  UNBOOKMARK_ERROR,
  UNBOOKMARK_ON_ALL,
} from '../types';

export const bookmarkArticle = (slug, articlePage, id) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/articles/${slug}/bookmarks`);

    if (articlePage === 'allArticles') {
      dispatch({ type: BOOKMARK_ON_ALL, payload: { data, id } });
      return toastr.success('Article bookmarked');
    }

    dispatch({ type: BOOKMARK, payload: data });

    return toastr.success('Article bookmarked');
  } catch ({ response }) {
    const errorMessage = response.data;
    toastr.error('Please login or signup');
    return dispatch({ type: BOOKMARK_ERROR, payload: errorMessage });
  }
};

export const unbookmarkArticle = (articleId, articlePage) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/user/bookmarks/${articleId}`);

    if (articlePage === 'allArticles') {
      dispatch({ type: UNBOOKMARK_ON_ALL, payload: { data, articleId } });
      return toastr.success('Article unbookmarked');
    }

    dispatch({ type: UNBOOKMARK, payload: data });

    return toastr.success('Article unbookmarked');
  } catch ({ response }) {
    const errorMessage = response.data;
    toastr.error('Please login or signup');
    return dispatch({ type: UNBOOKMARK_ERROR, payload: errorMessage });
  }
};
