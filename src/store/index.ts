import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'connected-react-router';

import rootReducer from './reducers';

// @ts-ignore
const store = applyMiddleware(routerMiddleware(history), thunk, promise, logger)(createStore)(rootReducer);

export default store;
