import toastr from 'toastr';
import axios from '../utils/axiosInstance';
import { OPT_IN, OPT_OUT, OPT_ERROR } from './types';

export const optInAction = () => ({ type: OPT_IN });
export const optOutAction = () => ({ type: OPT_OUT });
export const optError = error => ({ type: OPT_ERROR, error });

export const optInNotification = () => async (dispatch) => {
  try {
    await axios.post('user/notifications?email=yes');
    dispatch(optInAction());
    toastr.success('You have successfully opted in for notifications');
  } catch ({ message }) {
    dispatch(optError(message));
  }
};

export const optOutNotification = () => async (dispatch) => {
  try {
    await axios.post('user/notifications?email=no');
    dispatch(optOutAction());
    toastr.success('You have successfully opted out of notifications');
  } catch ({ message }) {
    dispatch(optError(message));
  }
};
