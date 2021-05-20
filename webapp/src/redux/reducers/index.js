import { combineReducers } from "redux";
import user from './user';
import activities from './activities';
import clients from './clients';

export default combineReducers({ user, activities, clients });
