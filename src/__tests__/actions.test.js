import MockAdapter from 'axios-mock-adapter';
import { login } from '../actions';
import axios from '../utils/axiosInstance';
import { LOG_IN } from '../actions/types';
import authUtils from '../utils/auth';

const axiosMock = new MockAdapter(axios, { delayResponse: 500 });

describe('Redux actions', () => {
  const dispatch = jest.fn();
  afterEach(() => {
    dispatch.mockRestore();
    axiosMock.restore();
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
});
