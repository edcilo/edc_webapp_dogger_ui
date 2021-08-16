import {
    RESERVATIONS_SET,
    RESERVATION_CREATE, 
    RESERVATION_UPDATE, 
    RESERVATION_DELETE
} from './../actionTypes';


const initialState = {
    all: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case RESERVATIONS_SET: {
            const all = action.payload.reservations
            return {...state, all}
        }
        case RESERVATION_CREATE: {
            const all = [action.payload.reservation, ...state.all]
            return {...state, all}
        }
        case RESERVATION_UPDATE: {
            const all = [...state.all];
            const reservation = action.payload.reservation
            const reservation_index = state.all.findIndex(item => item.id === reservation.id)
            all[reservation_index] = reservation
            return {...state, all}
        }
        case RESERVATION_DELETE: {
            const all = [...state.all];
            const reservation = action.payload.reservation
            const reservation_index = state.all.findIndex(item => item.id === reservation.id)
            all.splice(reservation_index, 1);
            return {...state, all}
        }
        default:
            return state;
    }
}
