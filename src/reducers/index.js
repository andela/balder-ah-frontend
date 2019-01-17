import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth';
import signupReducers from './signupReducers';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  signup: signupReducers,
});
