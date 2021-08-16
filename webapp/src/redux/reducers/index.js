import { combineReducers } from "redux";
import user from './user';
import reservations from './reservations';
import walkers from './walkers';

export default combineReducers({ user, reservations, walkers });
