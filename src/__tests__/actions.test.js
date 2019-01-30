import MockAdapter from 'axios-mock-adapter';
import {
  createNewArticle,
  getArticle,
  commentOnArticle,
  getArticles,
} from '../actions/articles';
import { login, getLoggedInUser } from '../actions/auth';
import createUser from '../actions/signup';
import axios from '../utils/axiosInstance';
import { getProfile, updateProfile } from '../actions/profile';
import {
  ERROR_SIGNUP_MESSAGE,
  SIGN_UP,
  SUCCESS_SIGNUP_MESSAGE,
  CREATE_ARTICLE,
  ERROR_CREATE_ARTICLE,
  VIEW_ARTICLE,
  VIEW_ARTICLE_ERROR,
  COMMENT_ON_ARTICLE,
  AUTHENTICATE_USER,
  GET_ALL_ARTICLES,
  GET_ALL_ARTICLES_SUCCESS_MSG,
  GET_ALL_ARTICLES_FAILURE_MSG,
} from '../actions/types';

import authUtils from '../utils/auth';

const axiosMock = new MockAdapter(axios, { delayResponse: 500 });

describe('Redux actions', () => {
  const dispatch = jest.fn();
  afterEach(() => {
    dispatch.mockRestore();
    axiosMock.reset();
  });

  afterAll(() => {
    authUtils.removeUserToken();
    axiosMock.restore();
  });

  describe('login', () => {
    test('call dispatch with correct type', async () => {
      const payload = { message: 'welcome', token: 'poop' };
      axiosMock.onPost().replyOnce(200, payload);
      await login()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenCalledWith({ type: AUTHENTICATE_USER, payload });
    });

    test('call dispatch with correct type', async () => {
      axiosMock.onPost().replyOnce(500, {});
      await login()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: AUTHENTICATE_USER });
    });
  });

  describe('signup action', () => {
    test('call dispatch with correct type', async () => {
      const payload = { message: 'welcome to Authors Haven', token: 'newToken' };
      axiosMock.onPost().replyOnce(200, payload);
      await createUser()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, { type: SIGN_UP, payload });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: SUCCESS_SIGNUP_MESSAGE,
        payload: payload.message,
      });
    });

    test('call dispatch with correct type', async () => {
      const payload = { errors: { body: ['hmmm'] } };
      axiosMock.onPost().replyOnce(500, payload);
      await createUser()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: ERROR_SIGNUP_MESSAGE,
        payload: payload.errors.body,
      });
    });
  });

  describe('allArticles action', () => {
    test('call dispatch with correct type', async () => {
      const payload = {
        allArticles: [],
        allTheArticles: 10,
        message: 'All articles found successfully',
        pageCount: 1,
      };
      await axiosMock.onGet().replyOnce(200, payload);
      await getArticles()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: GET_ALL_ARTICLES,
        payload: {
          data: [],
          allTheArticles: 10,
          pageCount: 1,
        },
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: GET_ALL_ARTICLES_SUCCESS_MSG,
        payload: payload.message,
      });
    });

    test('call dispatch with correct type', async () => {
      const payload = { errors: { body: ['Not found'] } };
      await axiosMock.onGet().replyOnce(500, payload);
      await getArticles()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: GET_ALL_ARTICLES_FAILURE_MSG,
        payload: payload.errors.body,
      });
    });
  });

  describe('Create Article', () => {
    test('call dispatch with correct type', async () => {
      const payload = { status: 'Success', message: 'Article created successfully' };
      axiosMock.onPost().replyOnce(200, payload);
      await createNewArticle()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ARTICLE, payload });
    });

    test('call dispatch with correct type', async () => {
      const payload = { errors: { body: ['fake error'] } };
      axiosMock.onPost().replyOnce(500, payload);
      await createNewArticle()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: ERROR_CREATE_ARTICLE,
        payload: payload.errors.body,
      });
    });
  });

  describe('View Article', () => {
    test('call dispatch with correct type', async () => {
      const payload = { status: 'Success', message: 'Article found successfully"' };
      axiosMock.onGet().replyOnce(200, payload);
      await getArticle()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: VIEW_ARTICLE, payload });
    });

    test('call dispatch with correct type', async () => {
      const payload = { response: { data: { message: 'fake error' } } };
      await axiosMock.onGet().replyOnce(500, payload);
      await getArticle()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: VIEW_ARTICLE_ERROR,
        payload: [payload.response.message],
      });
    });
  });

  describe('getProfile', () => {
    const tokenSpy = jest.spyOn(authUtils, 'getUserToken').mockImplementation(() => undefined);
    const payload = { currentUser: { name: 'kay' } };

    test('should call dispatch with correct type', async () => {
      await axiosMock.onGet().replyOnce(200, payload);
      await getProfile()(dispatch);
      expect(tokenSpy).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith({
        type: 'GET_USER_PROFILE',
        payload: { user: payload.currentUser },
      });
    });

    test('should call dispatch on failure', async () => {
      await axiosMock.onGet().replyOnce(500, {});
      await getProfile()(dispatch);
      expect(tokenSpy).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith({
        type: 'GET_USER_PROFILE_FAIL',
        payload: {
          message: undefined,
        },
      });
    });
  });

  describe('updateProfile', () => {
    const tokenSpy = jest.spyOn(authUtils, 'getUserToken').mockImplementation(() => undefined);
    const payload = { message: 'profile updated successfully', status: 'Success' };
    const userData = {
      username: 'kay',
      bio: 'kaying',
      image: 'kaying.png',
      email: 'ka@yi.ng',
    };

    test('should call dispatch with correct type and payload', async () => {
      axiosMock.onPut().replyOnce(200, payload);
      await updateProfile(userData)(dispatch);

      expect(tokenSpy).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_USER_PROFILE',
        payload: { message: payload.message, user: userData },
      });
    });

    test('should call dispatch on profile update failure', async () => {
      axiosMock.onPut().replyOnce(500, {});
      await updateProfile()(dispatch);

      expect(tokenSpy).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalled();
    });
  });
  describe('commentOnArticle', () => {
    test('comment successfully on article', async () => {
      axiosMock.onPost().replyOnce(200);
      await commentOnArticle()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenCalledWith({ type: COMMENT_ON_ARTICLE });
    });

    test('comment successfully on article', async () => {
      axiosMock.onPost().replyOnce(500);
      await commentOnArticle()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: COMMENT_ON_ARTICLE });
    });
  });

  describe('getLoggedInUser', () => {
    test('should get logged user by token', async () => {
      const payload = {
        currentUser: {
          username: 'johndoe',
        },
      };
      axiosMock.onGet().replyOnce(200, payload);

      await getLoggedInUser()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: AUTHENTICATE_USER,
        payload: { user: payload.currentUser },
      });
    });

    test('should fail to get logged in user', async () => {
      axiosMock.onGet().replyOnce(500);

      await getLoggedInUser()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: AUTHENTICATE_USER });
    });
  });
});
