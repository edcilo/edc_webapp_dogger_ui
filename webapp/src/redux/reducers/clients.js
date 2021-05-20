import { CLIENTS_SET } from './../actionTypes';

const initialState = {
    all: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case CLIENTS_SET: {
            const all = action.payload.clients
            return {...state, all}
        }
        default:
            return state
    }
}
