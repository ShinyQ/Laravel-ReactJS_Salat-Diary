import {ERR_GET_CURRENT_POSITION, GET_CURRENT_POSITION} from '../constant';

// Get the latitude and longitude
export const getGeoPosition = () => dispatch => {
    const success = pos => {
        dispatch({
            type: GET_CURRENT_POSITION,
            payload: {
                lat: pos.coords.latitude,
                long: pos.coords.longitude
            }
        })
    };

    const error = err => {
        dispatch({
            type: ERR_GET_CURRENT_POSITION,
            payload: err.message
        })
    };

    window.navigator.geolocation.watchPosition(success, error);
};