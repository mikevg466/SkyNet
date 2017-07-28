import { combineReducers } from 'redux';
import user from './user';
import weather from './weather';
import location from './location';
import query from './query';

export default combineReducers({
   user,
   weather,
   location,
   query,
  });
