import profileReducer from '../../reducers/profile';

const initialState = Object.freeze({
  username: '',
  email: '',
  bio: '',
  image: '',
  rating: '0',
  articles: [],
  followers: null,
  isFollowing: null,
  error: '',
});

const getProfileAction = {
  type: 'GET_USER_PROFILE',
  payload: {
    user: {
      username: 'kay',
      email: 'ka@yi.ng',
      bio: 'kaying to mars',
      image: 'kayi.ng',
      authorRating: 100,
      followers: {},
      isFollowing: null,
    },
  },
};

const getProfileFailAction = {
  type: 'GET_USER_PROFILE_FAIL',
  payload: {
    message: 'not buying it!',
  },
};

const updateProfileAction = {
  type: 'UPDATE_USER_PROFILE',
  payload: {
    message: 'Bourne Again SH',
    user: {
      username: 'marko',
      bio: 'half man half amazing',
      image: 'intrntnl-spcsttn.dc',
    },
  },
};

const updateProfileFailAction = {
  type: 'UPDATE_USER_PROFILE_FAIL',
  payload: {
    message: 'red leather michael',
  },
};

const getUserArticlesFail = {
  type: 'GET_USER_ARTICLES_FAIL',
  payload: { message: 'folding clothes' },
};

const deleteArticleFail = {
  type: 'DELETE_ARTICLE_FAIL',
  payload: { message: 'dollar and a dream' },
};

describe('Profile Reducer', () => {
  test('should set default state', () => {
    const state = profileReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  test('should get user profile', () => {
    const state = profileReducer(initialState, getProfileAction);

    expect(state).toEqual({
      username: 'kay',
      email: 'ka@yi.ng',
      bio: 'kaying to mars',
      image: 'kayi.ng',
      rating: 100,
      followers: null,
      isFollowing: null,
      error: '',
      articles: [],
    });
  });

  test('should fail to get user profile', () => {
    const state = profileReducer(initialState, getProfileFailAction);

    expect(state).toEqual({
      username: '',
      email: '',
      bio: '',
      image: '',
      rating: '0',
      followers: null,
      isFollowing: null,
      error: 'not buying it!',
      articles: [],
    });
  });

  test('should update user profile details', () => {
    const state = profileReducer({ ...initialState, username: 'stark' }, updateProfileAction);

    expect(state).toEqual({
      ...initialState,
      username: 'marko',
      bio: 'half man half amazing',
      image: 'intrntnl-spcsttn.dc',
    });
  });

  test('should fail to update user profile', () => {
    const state = profileReducer(undefined, updateProfileFailAction);

    expect(state).toEqual({ ...initialState, error: 'red leather michael' });
  });

  test('should fail to update user profile', () => {
    const state = profileReducer(undefined, getUserArticlesFail);

    expect(state).toEqual({ ...initialState, error: 'folding clothes' });
  });

  test('should fail to update user profile', () => {
    const state = profileReducer(undefined, deleteArticleFail);

    expect(state).toEqual({ ...initialState, error: 'dollar and a dream' });
  });
});
