import {combineReducers, ReducersMapObject, Reducer} from 'redux';
import {connectRouter} from 'connected-react-router';

import history from '@/store/history';

const reducers: ReducersMapObject = {
	router: connectRouter(history),
};

type RootState = {
  [key in keyof typeof reducers]: ReturnType<typeof reducers[key]>
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>(reducers);

export default rootReducer;

export {
	RootState,
};
