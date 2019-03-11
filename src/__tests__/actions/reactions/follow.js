import MockAdapter from 'axios-mock-adapter';
import axios from '../../../utils/axiosInstance';
import { follow, unFollow, getUserFollowers } from '../../../actions/reactions/follow';
import {
  FOLLOW,
  UNFOLLOW,
  UNFOLLOW_FAIL_MSG,
  FOLLOW_FAIL_MSG,
  GET_OTHER_FOLLOWERS,
} from '../../../actions/types';

const axiosMock = new MockAdapter(axios, { delayResponse: 500 });

const username = 'Johnson';

describe('Follow and unFollow Action', () => {
  const dispatch = jest.fn();
  afterEach(() => {
    dispatch.mockRestore();
    axiosMock.reset();
  });

  describe('Follow', () => {
    test('should allow user follow another user', async () => {
      const payload = 'You are now following Johnson';

      await axiosMock.onPost().replyOnce(200, payload);
      await follow(username)(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: FOLLOW, payload });
    });

    test('should not follow a user', async () => {
      const payload = { errors: { body: ['You are now following Johnson'] } };

      await axiosMock.onPost().replyOnce(403, payload);
      await follow(username)(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: FOLLOW_FAIL_MSG,
        payload: payload.errors.body,
      });
    });
  });

  describe('Unfollow', () => {
    test('should allow user unfollow another user', async () => {
      const payload = 'You have now followed Johnson';

      await axiosMock.onPost().replyOnce(200, payload);
      await unFollow(username)(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: UNFOLLOW, payload });
    });

    test('should not follow a user', async () => {
      const payload = { errors: { body: ['You have now unfollowed Johnson'] } };

      await axiosMock.onPost().replyOnce(403, payload);
      await unFollow(username)(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: UNFOLLOW_FAIL_MSG,
        payload: payload.errors.body,
      });
    });
  });

  describe('Followers', () => {
    test('should get all followers of a user', async () => {
      const payload = 'You have now followed Johnson';

      await axiosMock.onGet().replyOnce(200, payload);
      await getUserFollowers(username)(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: GET_OTHER_FOLLOWERS, payload });
    });

    test('should not get all follower of a user', async () => {
      const payload = { errors: { body: ['You have now unfollowed Johnson'] } };

      await axiosMock.onPost().replyOnce(403, payload);
      await getUserFollowers(username)(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
