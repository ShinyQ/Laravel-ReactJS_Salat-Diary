import moment from 'moment'
import salatDiary from '../apis/shalatDiary';
import {GET_KEY_SALAT, GET_KEY_STATUS} from "../constant";

/**
 * Get Jadwal Data .
 */
export const getKeySalat = () => async (dispatch, getState) => {
    const response = await salatDiary.get('/api/v1/jadwal', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${getState().auth.token}`
        }
    });
    dispatch({type: GET_KEY_SALAT, payload: response.data.data.data})
};

/**
 * Get Status Data.
 */
export const getKeyStatus = () => async (dispatch, getState) => {
    const response = await salatDiary.get('/api/v1/status', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${getState().auth.token}`
        }
    });
    dispatch({type: GET_KEY_STATUS, payload: response.data.data.data})
};

/**
 * Helper function to return the jadwal and status id.
 *
 * @param {Array} keySalat- An array of jadwal data
 * @param {Array} keyStatus- An array of status data
 * @param {string} salat - String of the salat name
 * @param {string} status - String of the status name
 *
 * @return{Object} - returns an Object of id
 */
const getAllKey = (keySalat, keyStatus, salat, status) => {
    const idJadwal = keySalat.find(key => key.nama === salat);
    const idStatus = keyStatus.find(key => key.nama === status);

    return {
        idJadwal: idJadwal.id,
        idStatus: idStatus.id
    }
};

export const submitStatusSalat = (salat, status) => async (dispatch, getState) => {
    const keySalat = getState().dataSalat.keySalat;
    const keyStatus = getState().dataSalat.keyStatus;

    const allKey = await getAllKey(keySalat, keyStatus, salat, status);

    try {
        const response = await salatDiary.post('/api/v1/salat', {
            tanggal: moment().format('YYYY-MM-DD'),
            id_status: allKey.idStatus,
            id_jadwal: allKey.idJadwal
        }, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${getState().auth.token}`
            }
        });

        console.log(response)
    } catch (e) {
        console.log(e.response)
    }

};