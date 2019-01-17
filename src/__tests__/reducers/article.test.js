import articleReducer from '../../reducers/articleReducer';

const initialState = {
  response: '',
};

const createArticle = {
  type: 'CREATE_ARTICLE',
  payload: {
    title: 'the main koko',
    body: 'the mainest body of the article',
    description: 'just a short description',
    tags: ['tag1', 'tags2', 'tag3'],
  },
};

const createArticleError = {
  type: 'ERROR_CREATE_ARTICLE',
  payload: {
    errorMessage: 'it is not done',
  },
};

const viewArticle = {
  type: 'VIEW_ARTICLE',
  payload: {
    id: 25,
    slug: 'trt-1547782873338',
    title: 'trt',
    description: 'trttr',
    body: 'rtrt',
    imgUrl: '',
    getOneArticle: {},
  },
};

const viewArticleError = {
  type: 'VIEW_ARTICLE_ERROR',
  payload: {
    errorMessage: 'i do not think so',
  },
};

const likeError = {
  type: 'LIKE_ERROR',
  error: 'Request failed with status 403',
};

describe('Article Reducer', () => {
  test('should set default state for viewing articles', () => {
    const state = articleReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  test('should set default state for creating articles', () => {
    const state = articleReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  test('should get an article', () => {
    const state = articleReducer(initialState, viewArticle);

    expect(state).toEqual({
      response: {
        id: 25,
        slug: 'trt-1547782873338',
        title: 'trt',
        description: 'trttr',
        body: 'rtrt',
        imgUrl: '',
        getOneArticle: {},
      },
      isLike: undefined,
    });
  });

  test('should fail to get user profile', () => {
    const state = articleReducer(initialState, viewArticleError);

    expect(state).toEqual({
      response: {
        message: {
          errorMessage: 'i do not think so',
        },
      },
    });
  });

  test('should create a new article', () => {
    const state = articleReducer({ ...initialState, response: { } }, createArticle);

    expect(state).toEqual({
      response: {
        title: 'the main koko',
        body: 'the mainest body of the article',
        description: 'just a short description',
        tags: ['tag1', 'tags2', 'tag3'],
      },
    });
  });

  test('should fail to create a new article', () => {
    const state = articleReducer(undefined, createArticleError);

    expect(state).toEqual({
      ...initialState,
      response: {
        message: {
          errorMessage: 'it is not done',
        },
      },
    });
  });

  test('should fail to like an article', () => {
    const state = articleReducer(undefined, likeError);

    expect(state).toEqual({
      ...initialState,
      likeError: 'Request failed with status 403',
      response: '',
      type: 'LIKE_ERROR',
    });
  });
});
