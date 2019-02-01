import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth';
import signupReducers from './signupReducers';
import articleReducer from './articleReducer';
import profileReducer from './profile';
import searchReducer from './search';
import notificationsReducer from './notifications';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  signup: signupReducers,
  article: articleReducer,
  profile: profileReducer,
  search: searchReducer,
  notifications: notificationsReducer,
});
