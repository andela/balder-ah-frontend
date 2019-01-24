import articleLike from '../../../reducers/articleReducer';
import { LIKE, UNLIKE } from '../../../actions/types';


let payload;
describe('like reducer', () => {
  test('should like an article', async () => {
    payload = true;
    expect(articleLike(
      undefined,
      { type: LIKE, payload },
    )).toEqual({ type: LIKE, isLike: true, response: '' });
  });

  test('should unlike an article', async () => {
    payload = false;
    expect(articleLike(
      undefined,
      { type: UNLIKE, payload },
    )).toEqual({ type: UNLIKE, isLike: false, response: '' });
  });
});
