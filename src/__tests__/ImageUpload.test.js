import 'jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import uploadImage from '../utils/imageUpload';

const axiosMock = new MockAdapter(axios, { delayResponse: 500 });
describe('Image upload function', () => {
  afterEach(() => {
    axiosMock.reset();
  });

  test('Test image upload success', async () => {
    const uploadResponse = { data: { secure_url: 'fakeurlfromcloudinary.com.jpg' } };
    await axiosMock.onPost().replyOnce(200, uploadResponse);
    await uploadImage();
    expect(uploadResponse).toEqual({ data: { secure_url: 'fakeurlfromcloudinary.com.jpg' } });
  });

  test('Test image upload success', async () => {
    const uploadResponse = { error: { message: 'bad request mehn' } };
    await axiosMock.onPost().replyOnce(500, uploadResponse);
    await uploadImage();
    expect(uploadResponse).toEqual({ error: { message: 'bad request mehn' } });
  });
});
