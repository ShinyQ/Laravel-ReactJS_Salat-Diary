import shalatDiary from '../apis/shalatDiary';
import {GET_LOGIN} from "../constant";

/**
 * Login Action used for login authentication
 *
 * @param {string} email- Email from the formValues
 * @param {string} password- Password from the formValues
 *
 */
export const getLogin = (email, password) => async dispatch => {
    const response = shalatDiary.post('/api/login', {email, password});

    dispatch({type: GET_LOGIN, payload: response.data});
};