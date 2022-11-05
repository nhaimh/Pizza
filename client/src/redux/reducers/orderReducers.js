import { LOADING_ORDERS, POST_ORDERS_SUCCESS, GET_ORDERS_SUCCESS, ORDERS_ERROR, UPDATE_ORDER } from '../types/actionTypes';
let initialState = {
    data: [], // all orders by userId
    error: null,
    isLoading: true,

}

export const ordersReducers = (state = initialState, action) => {
    switch (action.type) {

        case LOADING_ORDERS:
            return {
                ...state,
                error: null,
                isLoading: true,
            }
        case POST_ORDERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
            };
        case GET_ORDERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                data: action.payload,
            };
        case UPDATE_ORDER:
            let ordersArr = state.data.map(order => order._id === action.payload._id ? action.payload : order)
            return {
                ...state,
                data: ordersArr,
                error: null,
                isLoading: false
            }
        case ORDERS_ERROR:
            return {
                ...state,
                error: action.error,
                isLoading: false
            }
        default: return state
    }
} 