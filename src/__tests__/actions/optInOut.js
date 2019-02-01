import MockAdapter from 'axios-mock-adapter';
import axios from '../../utils/axiosInstance';
import { optInNotification, optOutNotification } from '../../actions/optInOut';
import { OPT_IN, OPT_OUT, OPT_ERROR } from '../../actions/types';

const axiosMock = new MockAdapter(axios, { delayResponse: 500 });
let error;

describe('Notification settings', () => {
  const dispatch = jest.fn();
  afterEach(() => {
    dispatch.mockRestore();
    axiosMock.reset();
  });

  describe('Opt in settings', () => {
    test('should opt in for notifications succussfully', async () => {
      await axiosMock.onPost().replyOnce(200);
      await optInNotification()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: OPT_IN });
    });

    test('should not opt in for notifications', async () => {
      error = 'Request failed with status code 400';
      await axiosMock.onPost().replyOnce(400);
      await optInNotification()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: OPT_ERROR, error });
    });
  });

  describe('Opt out settings', () => {
    test('should opt out of notifications successfully', async () => {
      await axiosMock.onPost().replyOnce(200);
      await optOutNotification()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: OPT_OUT });
    });

    test('should not fail to opt out of notificaions', async () => {
      error = 'Request failed with status code 400';
      await axiosMock.onPost().replyOnce(400);
      await optOutNotification()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: OPT_ERROR, error });
    });
  });
});
