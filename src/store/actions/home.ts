import {AnyAction} from 'redux';

import * as TYPES from '../actionType';

const homeActions = {
	setCounter(payload: number): AnyAction {
		return {type: TYPES.HOME_COUNTER, payload};
	}
};

export default homeActions;


