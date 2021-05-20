import { combineReducers } from "redux";
import user from './user';
import activities from './activities';

export default combineReducers({ user, activities });
