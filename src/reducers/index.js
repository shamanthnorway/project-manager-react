import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './manage-users';

const rootReducer = combineReducers({
  user: userReducer,
  form: formReducer 
});

export default rootReducer;
