import MockAdapter from 'axios-mock-adapter';
import axios from '../../../utils/axiosInstance';
import { likeComment, unlikeComment } from '../../../actions/reactions/likeComment';
import { LIKE_COMMENT, UNLIKE_COMMENT } from '../../../actions/types';

const axiosMock = new MockAdapter(axios, { delayResponse: 500 });

let payload;
const slug = 'Bootcamping-1547666736682';

describe('Like action', () => {
  const dispatch = jest.fn();
  afterEach(() => {
    dispatch.mockRestore();
    axiosMock.reset();
  });

  describe('like', () => {
    test('should like a comment', async () => {
      payload = { message: 'Comment favorited successully', IsCommentLike: true };
      await axiosMock.onPost().replyOnce(200, payload);
      await likeComment(slug, 3)(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: LIKE_COMMENT, payload });
    });

    test('should unlike a comment', async () => {
      payload = { message: 'Comment unfavorited successully', IsCommentLike: true };
      await axiosMock.onPost().replyOnce(200, payload);
      await unlikeComment(slug, 3)(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: UNLIKE_COMMENT, payload });
    });

    test('should error when tryin to unloke a comment', async () => {
      payload = { error: 'Request failed with status code 403', type: 'ERROR_LIKE_OR_UNLIKE_COMMENT' };
      await axiosMock.onPost().replyOnce(403, payload);
      await unlikeComment(slug, 3)(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: 'ERROR_LIKE_OR_UNLIKE_COMMENT', error: 'Request failed with status code 403' });
    });
  });
});
