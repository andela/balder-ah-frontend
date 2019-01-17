import MockAdapter from 'axios-mock-adapter';
import axios from '../../../utils/axiosInstance';
import { like, unlike } from '../../../actions/reactions/like';
import { LIKE, UNLIKE, LIKE_ERROR } from '../../../actions/types';

const axiosMock = new MockAdapter(axios, { delayResponse: 500 });

let payload;
let error;
const slug = 'Bootcamping-1547666736682';

describe('Like action', () => {
  const dispatch = jest.fn();
  afterEach(() => {
    dispatch.mockRestore();
    axiosMock.reset();
  });

  describe('like', () => {
    test('should like an article', async () => {
      payload = { message: 'Article favorited successully', favorited: true };
      await axiosMock.onPost().replyOnce(200, payload);
      await like(slug)(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: LIKE, payload });
    });

    test('should not like an article', async () => {
      error = 'Request failed with status code 403';
      await axiosMock.onPost().replyOnce(403, payload);
      await like(slug)(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: LIKE_ERROR, error });
    });
  });

  describe('unlike', () => {
    test('should unlike an article', async () => {
      payload = { message: 'Article unfavorited successully', favorited: false };
      await axiosMock.onDelete().replyOnce(200, payload);
      await unlike(slug)(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: UNLIKE, payload });
    });

    test('should not unlike an article', async () => {
      error = 'Request failed with status code 404';
      await axiosMock.onPost().replyOnce(404, payload);
      await unlike(slug)(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: LIKE_ERROR, error });
    });
  });
});
