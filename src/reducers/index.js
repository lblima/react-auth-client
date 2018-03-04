import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import FeatureReducer from './feature_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  feature: FeatureReducer
});

export default rootReducer;