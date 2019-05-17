import {GET_LOGIN, GET_LOGOUT, GET_REGISTER, IS_LOGGED_IN, RESET_IS_JUST_REGISTER} from "../constant";
import _ from 'lodash';

const INITIAL_STATE = {
    isJustRegister: null,
    token: null
};
//This is the location reducer to store the latitude and longitude
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_LOGIN:
            return {...state, ...action.payload, isJustRegister: null};
        case GET_REGISTER:
            return {...state, isJustRegister: true};
        case RESET_IS_JUST_REGISTER:
            return {...state, isJustRegister: null};
        case IS_LOGGED_IN:
            return {...state, isLoggedIn: action.payload};
        case GET_LOGOUT:
            return _.omit(state, 'token');
        default:
            return state
    }
};