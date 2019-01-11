import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import placeholderReducer from './placeholder';
import authReducer from './auth';

export default combineReducers({
  placeholder: placeholderReducer,
  auth: authReducer,
  form: formReducer,
});
