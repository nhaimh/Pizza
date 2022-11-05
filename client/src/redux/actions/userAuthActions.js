import { FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_ERROR, LOGOUT, LOGOUT_ERROR, LOGOUT_SUCCESS } from '../types/actionTypes';
import * as storageService from '../../services/storageService';
import { api } from '../../services/api';

export const fetchRegisterUser = (data) => {
    return async dispatch => {

        try {
            dispatch(fetchUser())

            const user = await api.post('/auth/register', data);
            storageService.setLocalStorage(user);
            dispatch(fetchUserSuccess(user));

        } catch (error) {
            dispatch(fetchUserError(error.message))
        }
    }
}

export const fetchLoginUser = (data) => {

    return async (dispatch) => {

        try {

            dispatch(fetchUser());
            const json = await api.post('/auth/login', data);
            storageService.setLocalStorage(json)
            dispatch(fetchUserSuccess(json))

        } catch (error) {
            dispatch(fetchUserError(error.message))
        }

    }

}

export const fetchLogout = (history) => {
    return async dispatch => {

        try {
            dispatch(userLogout());
            await api.get('/auth/logout', null, {
                'Authorization': 'Bearer ' + storageService.getLocalStorage()?.token,
                'Content-Type': 'application/json',
            });
            storageService.removeLocalStorage('user')
            dispatch(userLogoutSuccess())
            history('/login')
        } catch (error) {
            dispatch(userLogoutError(error.message))
        }

    }
}

const fetchUser = () => {
    return {
        type: FETCH_USER
    }
}

const fetchUserSuccess = (user) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: user
    }
}

const fetchUserError = (error) => {
    return {
        type: FETCH_USER_ERROR,
        error
    }
}

const userLogoutError = (error) => {

    return {
        type: LOGOUT_ERROR,
        error
    }
}

const userLogoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

const userLogout = () => {
    return {
        type: LOGOUT
    }
}

