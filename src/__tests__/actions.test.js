import MockAdapter from 'axios-mock-adapter';
import login from '../actions';
import { createNewArticle, getArticle } from '../actions/articles';
import createUser from '../actions/signup';
import axios from '../utils/axiosInstance';
import { getProfile, updateProfile } from '../actions/profile';
import {
  LOG_IN,
  ERROR_SIGNUP_MESSAGE,
  SIGN_UP,
  SUCCESS_SIGNUP_MESSAGE,
  CREATE_ARTICLE,
  ERROR_CREATE_ARTICLE,
  VIEW_ARTICLE,
  VIEW_ARTICLE_ERROR,
} from '../actions/types';
import authUtils from '../utils/auth';

const axiosMock = new MockAdapter(axios, { delayResponse: 500 });

describe('Redux actions', () => {
  const dispatch = jest.fn();
  afterEach(() => {
    dispatch.mockRestore();
    axiosMock.reset();
  });

  afterAll(authUtils.removeUserToken);

  describe('login', () => {
    test('call dispatch with correct type', async () => {
      const payload = { message: 'welcome', token: 'poop' };
      await axiosMock.onPost().replyOnce(200, payload);
      await login()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: LOG_IN, payload });
    });

    test('call dispatch with correct type', async () => {
      await axiosMock.onPost().replyOnce(500, {});
      await login()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: LOG_IN });
    });
  });

  describe('signup action', () => {
    test('call dispatch with correct type', async () => {
      const payload = { message: 'welcome to Authors Haven', token: 'newToken' };
      await axiosMock.onPost().replyOnce(200, payload);
      await createUser()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, { type: SIGN_UP, payload });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: SUCCESS_SIGNUP_MESSAGE, payload: payload.message,
      });
    });

    test('call dispatch with correct type', async () => {
      const payload = { errors: { body: ['hmmm'] } };
      await axiosMock.onPost().replyOnce(500, payload);
      await createUser()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: ERROR_SIGNUP_MESSAGE, payload: payload.errors.body,
      });
    });
  });

  describe('Create Article', () => {
    test('call dispatch with correct type', async () => {
      const payload = { status: 'Success', message: 'Article created successfully' };
      await axiosMock.onPost().replyOnce(200, payload);
      await createNewArticle()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ARTICLE, payload });
    });

    test('call dispatch with correct type', async () => {
      const payload = { errors: { body: ['fake error'] } };
      await axiosMock.onPost().replyOnce(500, payload);
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
      await axiosMock.onGet().replyOnce(200, payload);
      await getArticle()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: VIEW_ARTICLE, payload });
    });

    test('call dispatch with correct type', async () => {
      const payload = { errors: { body: ['fake error'] } };
      await axiosMock.onGet().replyOnce(500, payload);
      await getArticle()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: VIEW_ARTICLE_ERROR,
        payload: payload.errors.body,
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
});
