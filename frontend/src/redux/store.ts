import { createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'

import { foodReducer } from './food/foodReducer';

const persistConfig = {
    blacklist: [],
    key: 'foods',
    storage
  };

const persistedReducer = persistReducer(persistConfig, foodReducer);

// const store = createStore(persistedReducer)

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(logger)))

const persistor = persistStore(store);
export { store, persistor };