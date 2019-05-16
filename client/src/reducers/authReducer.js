import {GET_LOGIN, GET_REGISTER, RESET_IS_JUST_REGISTER} from "../constant";

const INITIAL_STATE = {
    login: null,
    isJustRegister: null,
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
        default:
            return state
    }
};