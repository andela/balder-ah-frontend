import { ARTICLE_RATING_ERROR } from './types';
import axios from '../utils/axiosInstance';

const postArticleRating = (ratingValue, slug) => async (dispatch) => {
  try {
    await axios.post(`/articles/${slug}/rating`, ratingValue);
  } catch (errorMessage) {
    dispatch({ type: ARTICLE_RATING_ERROR, payload: errorMessage });
  }
};

export default postArticleRating;
