import {EVENTS_LOADING, EVENTS_LOADED, EVENTS_ERROR, SET_CATEGORY} from "../actions/types";

const initialState = {
    category: null,
    events: [],
    isLoadingEvents: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case EVENTS_LOADING:
            return {
                ...state,
                isLoadingEvents: true
            };
        case EVENTS_LOADED:
            return {
                ...state,
                isLoadingEvents: false,
                events: action.payload
            };
        case EVENTS_ERROR:
            return {
                ...state,
                events: [],
                isLoadingEvents: false
            };
        case SET_CATEGORY:
            return {
                ...state,
                category: action.payload.category
            };
        default:
            return state;

    }
}