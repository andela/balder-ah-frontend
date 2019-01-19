import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import uploadImage from '../utils/imageUpload';

const axiosMock = new MockAdapter(axios);

describe('imageUpload unit test', () => {
  afterAll(axiosMock.restore);
  test('should attempt image upload', async () => {
    await axiosMock.onPost().replyOnce(200, { message: 'yulz' });
    const response = await uploadImage('myimage');
    expect(response.data).toEqual({ message: 'yulz' });
  });
});
