import shalatDiary from '../apis/shalatDiary';
import {
    GET_AUTH_ERROR,
    GET_LOGIN,
    GET_LOGOUT,
    GET_REGISTER,
    IS_LOGGED_IN,
    RESET_AUTH_ERROR,
    RESET_IS_JUST_REGISTER,
    START_LOADING,
    STOP_LOADING
} from "../constant";

/**
 * Login Action used for login authentication
 *
 * @param {string} email- Email from the formValues
 * @param {string} password- Password from the formValues
 *
 */
export const getLogin = (email, password) => async dispatch => {
    try {
        await dispatch({type: START_LOADING});
        const response = await shalatDiary.post('/api/login', {email, password});
        console.log(response.data);
        await dispatch({type: GET_LOGIN, payload: response.data.data});
        dispatch({type: STOP_LOADING});
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
        await dispatch({type: START_LOADING});
        const response = await shalatDiary.post('/api/register', {...userData});
        await dispatch({type: GET_REGISTER, payload: response.data});
        dispatch({type: STOP_LOADING});
        dispatch({type: RESET_AUTH_ERROR});
        redirectOnSuccess();
    } catch (e) {
        dispatch({type: STOP_LOADING});
        dispatch({type: GET_AUTH_ERROR, payload: e.response.data.data.errors[0]});
    }
};

export const getEmailValidation = token => async dispatch => {
    try {
        const response = await shalatDiary.get(`/api/verifikasi/${token}`);
        console.log(response)
    } catch (e) {
        console.log(e.response.data)
    }
};

/**
 * Flag to check if user just registered
 */
export const resetIsJustRegister = () => {
    return {
        type: RESET_IS_JUST_REGISTER
    }
};

/**
 * Check if the user is still logged in
 */

export const checkLoggedIn = () => (dispatch, getState) => {
    const token = getState().auth.token;
    if (token !== "null" && token && token !== "undefined") {
        dispatch({
            type: IS_LOGGED_IN,
            payload: true
        })
    } else {
        dispatch({
            type: IS_LOGGED_IN,
            payload: false
        })
    }
};

/**
 * Logout Action
 */
export const getLogout = () => {
    return {
        type: GET_LOGOUT
    }
};

export const getCurrentUser = () => async (dispatch, getState) => {
    const response = await shalatDiary.get('/api/v1/user', {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${getState().auth.token}`
        }
    });

    console.log(response);
};