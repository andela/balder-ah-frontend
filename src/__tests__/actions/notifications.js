import MockAdapter from 'axios-mock-adapter';
import axios from '../../utils/axiosInstance';
import getNotifications from '../../actions/notifications';
import { GET_NOTIFICATIONS } from '../../actions/types';

describe('Get Notifications', () => {
  const dispatch = jest.fn();
  const axiosMock = new MockAdapter(axios, { delayResponse: 500 });

  afterEach(() => {
    dispatch.mockRestore();
    axiosMock.reset();
  });

  describe('Get notifications', () => {
    const payload = { notifications: 'Marcus just followed you.' };

    test('should get notifications successfully', async () => {
      await axiosMock.onGet().replyOnce(200, payload);
      await getNotifications()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: GET_NOTIFICATIONS, payload: payload.notifications,
      });
    });

    test('should not get notifications', async () => {
      const error = ['Something went wrong'];
      await axiosMock.onGet().replyOnce(403, error);
      expect(() => getNotifications()(dispatch).toThrow(error));
    });
  });
});
