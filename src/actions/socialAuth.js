import { SOCIAL_AUTH } from './types';
import authUtils from '../utils/auth';

const socialAuth = (token) => {
  authUtils.saveUserToken(token);
  return {
    type: SOCIAL_AUTH,
  };
};

export default socialAuth;
