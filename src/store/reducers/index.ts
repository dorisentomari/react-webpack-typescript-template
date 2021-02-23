import {combineReducers, ReducersMapObject, Reducer} from 'redux';
import {connectRouter} from 'connected-react-router';

import history from '@/store/history';
import homeReducer from '@/store/reducers/home';

const reducers: ReducersMapObject = {
	router: connectRouter(history),
	home: homeReducer,
};

type RootState = {
  [key in keyof typeof reducers]: ReturnType<typeof reducers[key]>
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>(reducers);

export default rootReducer;

export {
	RootState,
};
