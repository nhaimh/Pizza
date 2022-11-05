import { LOADING_USERS, USERS_SUCCESS, USERS_ERRORS, EDIT_USER, DELETE_USER } from '../types/actionTypes'
import { getLocalStorage } from '../../services/storageService';
import { api } from '../../services/api';

export const fetchDeleteUser = (id) => {

    return async (dispatch) => {
        try {
            let response = await api.delete(`/users/${id}`, null, {
                'Authorization': 'Bearer ' + getLocalStorage()?.token,
                'Content-Type': 'application/json',
            })

            if (response.ok) {
                dispatch(deleteUser(id))
            }
        } catch (error) {
            dispatch(usersError(error))
        }
    }
}

export const fetchGetAllUsers = () => {
    return async dispatch => {
        try {
            let users = await api.get('/users')

            dispatch({ type: USERS_SUCCESS, payload: users })
        } catch (error) {
            dispatch({ type: USERS_ERRORS, error })
        }
    }
}

export const fetchPutUser = (id, userData) => {
    return async dispatch => {
        try {
            dispatch(isLoading())
            let user = await api.put(`/users/${id}`, userData, {
                'Authorization': 'Bearer ' + getLocalStorage()?.token,
                'Content-Type': 'application/json',
            })

            dispatch(editUser(user))
        } catch (error) {
            dispatch(usersError(error.message))
        }
    }
}

const isLoading = () => {
    return {
        type: LOADING_USERS
    }
}

const editUser = (user) => {
    return {
        type: EDIT_USER,
        payload: user
    }
}

const deleteUser = (userId) => {

    return {
        type: DELETE_USER,
        payload: userId
    }
}

const usersError = (error) => {
    return {
        type: USERS_ERRORS,
        error
    }
}