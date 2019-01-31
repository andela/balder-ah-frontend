import articleReducer from '../../reducers/articleReducer';

const articlePayload = {
  type: 'UPDATE_ARTICLE',
  payload: 'Article has been updated successfully',
};

const articlePayloadError = {
  type: 'UPDATE_ARTICLE_ERROR',
  payload: 'Article was not updated',
};
const initialState = {
  response: '',
  selectedArticle: { comments: [] },
  all: { data: ['west, sidde'], pageCount: 0 },
};
describe('edit artcle reducer', () => {
  test('should return updated article', () => {
    const state = articleReducer(initialState, articlePayload);
    expect(state).toEqual({
      ...initialState,
      upDateArticleMessage: 'Article has been updated successfully',
    });
  });
  test('should return error for updated article', () => {
    const state = articleReducer(initialState, articlePayloadError);
    expect(state).toEqual({
      ...initialState,
      ErrorMessage: 'Article was not updated',
    });
  });
});
