import MockAdapter from 'axios-mock-adapter';
import { login } from '../actions';
import createUser from '../actions/signup';
import axios from '../utils/axiosInstance';
import {
  LOG_IN,
  ERROR_SIGNUP_MESSAGE,
  SIGN_UP,
  SUCCESS_SIGNUP_MESSAGE,
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
});
