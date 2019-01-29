import { SEARCH } from '../actions/types';

const initialState = { results: [], query: '' };

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEARCH:
      return payload
        ? { ...state, results: payload.articles, query: payload.query }
        : initialState;
    default:
      return state;
  }
};
