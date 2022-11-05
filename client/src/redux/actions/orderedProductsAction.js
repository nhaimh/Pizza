import { LOADING_PRODUCTS, GET_PRODUCTS_BY_ORDER_ID_SUCCESS, ORDERED_PRODUCTS_ERROR, } from '../types/actionTypes'

import { api } from '../../services/api';


export const getProductsByOrderId = (orderId) => {
    return async dispatch => {

        try {
            dispatch(loadingProducts())

            const response = await api.get(`/orders/list/${orderId}`);

            dispatch(getProductsByOrderIdSuccess(response));

        } catch (error) {
            dispatch(getProductsError(error.message))
        }
    }
}




const loadingProducts = () => {
    return {
        type: LOADING_PRODUCTS,
    }
}




const getProductsError = (error) => {
    return {
        type: ORDERED_PRODUCTS_ERROR,
        error
    }
}

const getProductsByOrderIdSuccess = (orders) => {
    return {
        type: GET_PRODUCTS_BY_ORDER_ID_SUCCESS,
        payload: orders
    }
}