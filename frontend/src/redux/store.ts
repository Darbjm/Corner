import { createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'

import rootReducer from './index';

const persistConfig = {
    blacklist: [],
    key: 'all',
    storage
  };

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer)

// const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(logger)))

const persistor = persistStore(store);
export { store, persistor };