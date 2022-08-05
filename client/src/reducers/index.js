import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import branches from './branches';
import home from './home'

export const reducers = combineReducers({ posts, auth, branches, home });
