import toastr from 'toastr';
import axios from '../utils/axiosInstance';
import { UPDATE_PASSWORD } from './types';

const updatepassword = formdata => async (dispatch) => {
  try {
    const { data: { message } } = await axios.post(`/users/updatepassword?token=${window.localStorage.getItem('updatepasswordToken')}`, formdata);
    window.localStorage.removeItem('updatepasswordToken');
    dispatch({ type: UPDATE_PASSWORD, paylaod: message });
    return true;
  } catch (error) {
    toastr.error('request failed due to server error, please try again later');
    return false;
  }
};

export default updatepassword;
