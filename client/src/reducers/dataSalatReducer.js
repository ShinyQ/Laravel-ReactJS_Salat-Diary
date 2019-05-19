import {SET_JADWAL_SALAT, SET_SALAT_NOW} from "../constant";

const INITIAL_STATE = {
    salatNow: null,
    jadwalSalat: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_JADWAL_SALAT:
            return {...state, jadwalSalat: action.payload};
        case SET_SALAT_NOW:
            return {...state, salatNow: action.payload};
        default:
            return state
    }
}