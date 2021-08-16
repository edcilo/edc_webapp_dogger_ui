import { WALKERS_SET } from './../actionTypes';

const initialState = {
    all: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case WALKERS_SET: {
            const all = action.payload.walkers
            return {...state, all}
        }
        default:
            return state
    }
}
