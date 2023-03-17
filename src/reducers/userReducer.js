import { SET_USER } from "../action/actionType";

export const defaultUser = {
	photoURL: "https://i0.wp.com/gnadoemedia.com/wp-content/uploads/2020/06/c7a39f1c8da575307d9cfd23c55811e03d9b7f76-e1593423898946.jpeg",
	displayName: "Harold",
	email: "harold@gmail.com",
}

const INITIAL_STATE = {
	user: defaultUser,
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				user: action.user,
			};
		default:
			return state;
	}
};

export default userReducer;
