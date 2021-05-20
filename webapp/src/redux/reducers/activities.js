import {
    ACTIVITIES_SET,
    ACTIVITY_CREATE, 
    ACTIVITY_UPDATE, 
    ACTIVITY_DELETE
} from './../actionTypes';


const initialState = {
    all: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case ACTIVITIES_SET: {
            const all = action.payload.activities
            return {...state, all}
        }
        case ACTIVITY_CREATE: {
            const all = [action.payload.activity, ...state.all]
            return {...state, all}
        }
        case ACTIVITY_UPDATE: {
            const all = [...state.all];
            const activity = action.payload.activity
            const activity_index = state.all.findIndex(item => item.id === activity.id)
            all[activity_index] = activity
            return {...state, all}
        }
        case ACTIVITY_DELETE: {
            const all = [...state.all];
            const activity = action.payload.activity
            const activity_index = state.all.findIndex(item => item.id === activity.id)
            all.splice(activity_index, 1);
            return {...state, all}
        }
        default:
            return state;
    }
}
