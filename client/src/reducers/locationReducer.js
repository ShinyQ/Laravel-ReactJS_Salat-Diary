import {ERR_GET_CURRENT_POSITION, GET_CURRENT_POSITION} from "../constant";

const INITIAL_STATE = {
    lat: null,
    long: null,
    error: null
};
//This is the location reducer to store the latitude and longitude
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CURRENT_POSITION:
            return {...state, lat: action.payload.lat, long: action.payload.long};
        case ERR_GET_CURRENT_POSITION:
            return {...state, error: action.payload};
        default:
            return state
    }
};