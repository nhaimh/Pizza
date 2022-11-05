import { LOADING_USERS, USERS_SUCCESS, USERS_ERRORS, EDIT_USER, DELETE_USER } from '../types/actionTypes'

let initialState = {
    isLoading: false,
    data: [],
    error: ''
};

export const reducerUsers = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_USERS:
            return {
                ...state,
                isLoading: true
            }
        case USERS_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false
            };
        case USERS_ERRORS:
            return {
                ...state,
                error: action.error,
                isLoading: false
            };
        case EDIT_USER:
            const currentUser = action.payload;
            const updatedArr = state.data.map(user => user._id === currentUser._id ? currentUser : user)
            return {
                ...state,
                data: updatedArr,
                isLoading: false
            }
        case DELETE_USER:
            const userId = action.payload;
            const users = state.data.filter(user => user._id !== userId)
            return {
                ...state,
                data: users,
                isLoading: false
            }
        default: return state
    }
}