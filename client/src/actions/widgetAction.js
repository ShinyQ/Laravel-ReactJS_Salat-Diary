import {TOGGLE_DRAWER} from "../constant";

export const toggleDrawer = () => (dispatch, getState) => {
    const isOpen = getState().widget.isDrawerOpen;

    dispatch({
        type: TOGGLE_DRAWER,
        payload: !isOpen
    })
};