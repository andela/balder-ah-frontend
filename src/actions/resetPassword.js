import toastr from 'toastr';
import axios from '../utils/axiosInstance';
import { PASSWORD_RESET } from './types';

const resetPassword = formdata => async (dispatch) => {
  try {
    const { data: { message } } = await axios.post('/users/resetpassword', formdata);
    dispatch({ type: PASSWORD_RESET, payload: message });
    return toastr
      .success('Check your mail to continue.');
  } catch (error) {
    toastr.options.newestOnTop = false;
    return toastr.success('Check your mail to continue.');
  }
};

export default resetPassword;
