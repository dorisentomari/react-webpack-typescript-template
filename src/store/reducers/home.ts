
import {AnyAction} from 'redux';

import * as TYPES from '../actionType';

export interface HomeState {
  counter: number;
}

const initialState: HomeState = {
	counter: 0,
};

export default function homeReducer(state = initialState, action: AnyAction): HomeState {
	switch (action.type) {
	case TYPES.HOME_COUNTER:
		return { ...state, counter: action.payload };
	default:
		return state;
	}
}

