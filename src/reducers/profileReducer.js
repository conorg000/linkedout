import { SET_LOADING_STATUS, GET_PROFILES } from "../action/actionType";

export const initialState = {
	loading: false,
	profiles: [],
};

function profileReducer(state = initialState, action) {
	switch (action.type) {
		case GET_PROFILES:
			return {
				...state,
				profiles: action.payload,
				ids: action.id,
			};
		case SET_LOADING_STATUS:
			return {
				...state,
				loading: action.status,
			};
		default:
			return state;
	}
}

export default profileReducer;
