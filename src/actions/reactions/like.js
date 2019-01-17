import toastr from 'toastr';
import axios from '../../utils/axiosInstance';
import { LIKE, UNLIKE, LIKE_ERROR } from '../types';

const errorMessage = 'Please login or signup';

export const likeAction = payload => ({ type: LIKE, payload });
export const unlikeAction = payload => ({ type: UNLIKE, payload });
export const likeError = error => ({ type: LIKE_ERROR, error });

export const like = slug => async (dispatch) => {
  try {
    const { data } = await axios.post(`articles/${slug}/favorite`);
    dispatch(likeAction(data));
  } catch ({ message }) {
    dispatch(likeError(message));
    toastr.error(errorMessage);
  }
};

export const unlike = slug => async (dispatch) => {
  try {
    const { data } = await axios.delete(`articles/${slug}/favorite`);
    dispatch(unlikeAction(data));
  } catch ({ message }) {
    dispatch(likeError(message));
    toastr.error(errorMessage);
  }
};
