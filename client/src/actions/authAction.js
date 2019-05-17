import shalatDiary from '../apis/shalatDiary';
import {GET_LOGIN, GET_REGISTER, RESET_IS_JUST_REGISTER} from "../constant";

/**
 * Login Action used for login authentication
 *
 * @param {string} email- Email from the formValues
 * @param {string} password- Password from the formValues
 *
 */
export const getLogin = (email, password) => async dispatch => {
    try {
        const response = await shalatDiary.post('/api/login', {email, password});

        console.log(response.data);
        dispatch({type: GET_LOGIN, payload: response.data.data});
    } catch (e) {
        console.log(e.response)
    }
};

/**
 * Register Action used for Register User
 *
 * @param {object} userData- Object containing all key and value to post
 *
 */
export const getRegister = (userData, redirectOnSuccess) => async dispatch => {
    try {
        const response = await shalatDiary.post('/api/register', {...userData});
        dispatch({type: GET_REGISTER, payload: response.data});
        redirectOnSuccess();
    } catch (e) {
        console.log(e.response);
    }
};

export const resetIsJustRegister = () => {
    return {
        type: RESET_IS_JUST_REGISTER
    }
};