import axios from '../utils/axiosInstance';
import { SEARCH } from './types';


export default ({ query, by = 'article' }) => async (dispatch) => {
  const [author, article, tag] = ['author', 'article', 'tag'];
  const searchTypes = { article, tag, author };
  const searchBy = searchTypes[by] || '';

  if (!searchBy) return;
  try {
    const { data: { articles } } = await axios.get(`/search/${searchBy}/${query}`);
    dispatch({ type: SEARCH, payload: { articles, query } });
  } catch (error) {
    dispatch({ type: SEARCH });
  }
};
