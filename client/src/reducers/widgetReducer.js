import {TOGGLE_DRAWER} from "../constant";

const INITIAL_STATE = {
    isDrawerOpen: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_DRAWER:
            return {...state, isDrawerOpen: action.payload};
        default:
            return state
    }
}