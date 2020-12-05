import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'

import {userReducer} from './user/userReducer';

export const store = createStore(userReducer, composeWithDevTools(applyMiddleware(logger)))
