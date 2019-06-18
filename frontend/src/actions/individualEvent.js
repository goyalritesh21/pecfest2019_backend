import axios from 'axios';
import {returnErrors} from "./messages";

import {
    EVENT_LOADED,
    EVENTS_LOADING,
    EVENT_ERROR,
    EVENT_REGISTER_SUCCESS,
    EVENT_REGISTER_FAIL
} from "./types";
import {tokenConfig} from "./auth";

export const loadEvent = (eventId) => (dispatch, getState) => {
    dispatch({type: EVENTS_LOADING});
    axios.get(`api/events/${eventId}`)
        .then(res => {
            dispatch({
                type: EVENT_LOADED,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: EVENT_ERROR
            });
        })
};

export const registerEvent = (eventId) => (dispatch, getState) => {
    dispatch({type: EVENTS_LOADING});
    const body = JSON.stringify({eventId});
    axios.post(`api/events/register/${eventId}`, body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: EVENT_REGISTER_SUCCESS,
                payload: res.data
            });
        })
        .catch(error => {
            dispatch(returnErrors(error.response.data, error.response.status));
            dispatch({
                type: EVENT_REGISTER_FAIL
            });
        });
};