import {GET_LOGIN} from "../constant";

const INITIAL_STATE = {
    login: null
};
//This is the location reducer to store the latitude and longitude
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_LOGIN:
            return {...state, ...action.payload};
        default:
            return state
    }
};