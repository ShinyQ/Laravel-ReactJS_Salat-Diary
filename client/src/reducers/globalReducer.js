import {START_LOADING, STOP_LOADING} from "../constant";

const INITIAL_STATE = {
    isLoading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case START_LOADING:
            return {...state, isLoading: true};
        case STOP_LOADING:
            return {...state, isLoading: false};
        default:
            return state
    }
}