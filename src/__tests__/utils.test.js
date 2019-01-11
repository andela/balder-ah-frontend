import authUtils from '../utils/auth';

test('Auth utils', () => {
  expect(authUtils.saveUserToken('bad-token')).toBe(undefined);
  expect(authUtils.getUserToken()).toBe('bad-token');
  authUtils.removeUserToken();
  expect(authUtils.getUserToken()).toBe(null);
});
