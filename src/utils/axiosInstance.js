import axios from 'axios';
import authUtils from './auth';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://balder-ah-backend-staging.herokuapp.com/api',
});

instance.interceptors.request.use((config) => {
  const configInstance = { ...config };
  configInstance.headers.Authorization = authUtils.getUserToken();
  return configInstance;
});

export default instance;
