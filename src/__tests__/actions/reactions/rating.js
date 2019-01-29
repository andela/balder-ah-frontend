import MockAdapter from 'axios-mock-adapter';
import axios from '../../../utils/axiosInstance';
import rating from '../../../actions/rating';

describe('Rating actions', () => {
  const dispatch = jest.fn();
  const axiosMock = new MockAdapter(axios, { delayResponse: 500 });

  const slug = 'mastering-react-redux-1547666736682';

  afterEach(() => {
    dispatch.mockRestore();
    axiosMock.reset();
  });

  describe('should rate an article', () => {
    test('should rate an article successfully', async () => {
      await axiosMock.onPost().replyOnce(200);
      await rating(slug)();
      expect(dispatch).toHaveBeenCalledTimes(0);
    });

    test('should not rate an article', async () => {
      await axiosMock.onPost().replyOnce(403);
      await rating(slug)(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
