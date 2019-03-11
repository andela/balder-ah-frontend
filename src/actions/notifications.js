import { GET_NOTIFICATIONS, NEW_NOTIFICATION } from './types';
import axios from '../utils/axiosInstance';

const getNotifications = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/user/notifications');
    dispatch({ type: GET_NOTIFICATIONS, payload: data.notifications });
  } catch (error) {
    throw error;
  }
};

export const newNotification = data => ({ type: NEW_NOTIFICATION, payload: data });

export default getNotifications;
