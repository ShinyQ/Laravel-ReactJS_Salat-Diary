import {ERR_GET_CURRENT_POSITION, GET_CURRENT_POSITION, GET_KABUPATEN, GET_PROVINSI} from '../constant';
import provinsiKota from '../apis/provinsiKota';

/**
 * Get Geolocation Action
 *
 */
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

export const getProvinsi = () => async dispatch => {
    const response = await provinsiKota.get('/provinsi');
    dispatch({type: GET_PROVINSI, payload: response.data.semuaprovinsi});
};

export const getKabupaten = idProv => async dispatch => {
    const response = await await provinsiKota.get(`/provinsi/${idProv}/kabupaten`);
    dispatch({type: GET_KABUPATEN, payload: response.data.kabupatens})
};