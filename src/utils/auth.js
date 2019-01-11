const tokenKey = 'token';

const saveUserToken = token => window.localStorage.setItem(tokenKey, token);
const getUserToken = () => window.localStorage.getItem(tokenKey);
const removeUserToken = () => window.localStorage.removeItem(tokenKey);

export default {
  saveUserToken,
  getUserToken,
  removeUserToken,
};
