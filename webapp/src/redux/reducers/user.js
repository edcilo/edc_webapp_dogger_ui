import { USER_LOGIN, USER_LOGOUT } from "./../actionTypes";


const initialState = {
    token: null,
    refresh_token: null,
    data: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        case USER_LOGIN: {
            const token = action.payload.token;
            const refresh_token = action.payload.refresh;
            const data = action.payload.data;
            return {...state, token, refresh_token, data};
        }
        case USER_LOGOUT: {
            const token = null;
            const refresh_token = null;
            const data = null;
            return {...state, token, refresh_token, data};
        }
        default: 
            return state
    }
}
