import {
    GET_KEY_SALAT,
    GET_KEY_STATUS,
    GET_SELECTED_DATE_SALAT,
    GET_TODAY_SALAT,
    SET_JADWAL_SALAT,
    SET_SALAT_NOW
} from "../constant";

const INITIAL_STATE = {
    salatNow: null,
    jadwalSalat: null,
    keySalat: null,
    keyStatus: null,
    todaySalat: [],
    selectedDateSalat: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_JADWAL_SALAT:
            return {...state, jadwalSalat: action.payload};
        case SET_SALAT_NOW:
            return {...state, salatNow: action.payload};
        case GET_KEY_SALAT:
            return {...state, keySalat: action.payload};
        case GET_KEY_STATUS:
            return {...state, keyStatus: action.payload};
        case GET_TODAY_SALAT:
            return {...state, todaySalat: action.payload};
        case GET_SELECTED_DATE_SALAT:
            return {...state, selectedDateSalat: action.payload};
        default:
            return state
    }
}