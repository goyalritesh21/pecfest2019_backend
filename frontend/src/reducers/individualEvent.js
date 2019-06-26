import {
    EVENT_ERROR,
    EVENT_LOADED,
    EVENT_LOADING,
    EVENT_REGISTER_SUCCESS,
    EVENT_REGISTER_FAIL,
    SET_EVENT
} from "../actions/types";

const initialState = {
    eventLoading : false,
    event: null,
    registered: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_EVENT:
            return {
                ...state,
                event: {
                    eventId: action.payload.eventId
                }
            };
        case EVENT_LOADING:
            return {
                ...state,
                eventLoading: true
            };
        case EVENT_LOADED:
            return {
                ...state,
                eventLoading: false,
                event: action.payload
            };
        case EVENT_ERROR:
            return {
                ...state,
                eventLoading: false,
                event: null
            };
        case EVENT_REGISTER_SUCCESS:
            return {
                ...state,
                registered: true
            };
        case EVENT_REGISTER_FAIL:
            return {
                ...state,
                registered: false
            };
        default:
            return state;
    }
}