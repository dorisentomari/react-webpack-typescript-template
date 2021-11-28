import {combineReducers, ReducersMapObject, Reducer} from 'redux';

import homeReducer from '@/store/reducers/home';

const reducers: ReducersMapObject = {
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
