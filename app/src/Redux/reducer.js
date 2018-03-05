const initialState = {
	isLoggedIn: false,
	user: {
		username: null,
		store: null
	},
	token: localStorage.getItem('token') ? localStorage.getItem('token') : null
}

const LOGIN_USER = 'LOGIN_USER'
const UPDATE_USER_INFO = 'UPDATE_USER_INFO'

export function setLoginStatus(value) {
	return { type: LOGIN_USER, payload: value }
}

export function updateUserInfo(userInfo) {
	return { type: UPDATE_USER_INFO, payload: userInfo }
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case LOGIN_USER:
			return Object.assign({}, state, { isLoggedIn: action.payload })
		case UPDATE_USER_INFO:
			return Object.assign({}, state, { user: action.payload })
		default:
			return state
	}
}
