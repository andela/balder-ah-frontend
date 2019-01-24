import MockAdapter from 'axios-mock-adapter';
import resetPassword from '../actions/resetPassword';
import axios from '../utils/axiosInstance';
import { PASSWORD_RESET } from '../actions/types';

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

  describe('reset password', () => {
    test('call dispatch with correct type', async () => {
      const payload = { message: 'Password updated successfully', token: 'poop' };
      axiosMock.onPost().replyOnce(200, payload);
      await resetPassword()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: PASSWORD_RESET, payload: payload.message });
    });
  });
});
