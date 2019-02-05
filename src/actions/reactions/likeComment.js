import toastr from 'toastr';
import axios from '../../utils/axiosInstance';
import { LIKE_COMMENT, UNLIKE_COMMENT, ERROR_LIKE_OR_UNLIKE_COMMENT } from '../types';

const errorMessage = 'Please login or signup';

export const likeComment = (slug, commentId) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/articles/${slug}/comments/${commentId}/reaction`);
    dispatch({ type: LIKE_COMMENT, payload: data });
  } catch ({ message }) {
    dispatch({ type: ERROR_LIKE_OR_UNLIKE_COMMENT, error: message });
    toastr.error(errorMessage);
  }
};

export const unlikeComment = (slug, commentId) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/articles/${slug}/comments/${commentId}/reaction`);
    dispatch({ type: UNLIKE_COMMENT, payload: data });
  } catch ({ message }) {
    dispatch({ type: 'ERROR_LIKE_OR_UNLIKE_COMMENT', error: message });
    toastr.error(errorMessage);
  }
};
