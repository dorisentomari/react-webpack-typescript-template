import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import {ENV_CONST} from '@/config/global';

const middlewares = [
	thunk,
	promise,
];

if (process.env.NODE_ENV !== ENV_CONST.prod) {
	middlewares.push(logger);
}

const store = applyMiddleware(...middlewares)(createStore)(rootReducer);

// @ts-ignore
window.store = store;

export default store;
