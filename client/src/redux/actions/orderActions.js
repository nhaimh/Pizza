import { LOADING_ORDERS, POST_ORDERS_SUCCESS, GET_ORDERS_SUCCESS, ORDERS_ERROR, UPDATE_ORDER } from '../types/actionTypes';

import { api } from '../../services/api';
import { getLocalStorage } from '../../services/storageService';
import { v4 as uuid } from "uuid";


export const createOrders = (data, userId, orderTotal) => {
    return async dispatch => {
        try {
            dispatch(loadingOrders())

            const order = {
                orderId: uuid(),
                userId,
                orderTotal: orderTotal.toString(),
                data,
            }

            const response = await api.post('/orders', order, {

                'Authorization': 'Bearer ' + getLocalStorage()?.token,
                'Content-Type': 'application/json',
            })

            if (response.ok) {
                dispatch(postOrderSuccess())
            }

        } catch (error) {
            dispatch(ordersError(error.message))
        }
    }
}

export const editOrder = (data, history) => {
    return async dispatch => {
        try {
            dispatch(loadingOrders())
            const res = await api.put(`/orders/${data._id}`, data, {
                'Authorization': 'Bearer ' + getLocalStorage()?.token,
                'Content-Type': 'application/json',

            });

            dispatch(putOrderSuccess(res))
            history('/orders')

        } catch (error) {
            dispatch(ordersError(error))
        }
    }
}

export const getOrdersByUserId = (userId) => {
    return async dispatch => {
        try {
            dispatch(loadingOrders())

            const response = await api.get(`/orders/${userId}`);

            dispatch(getOrderSuccess(response));

        } catch (error) {
            dispatch(ordersError(error.message))
        }
    }
}

const postOrderSuccess = () => {
    return {
        type: POST_ORDERS_SUCCESS,
    }
}

const loadingOrders = () => {
    return {
        type: LOADING_ORDERS,
    }
}

const ordersError = (error) => {
    return {
        type: ORDERS_ERROR,
        error
    }
}

const getOrderSuccess = (orders) => {
    return {
        type: GET_ORDERS_SUCCESS,
        payload: orders
    }
}

const putOrderSuccess = (order) => {
    return {
        type: UPDATE_ORDER,
        payload: order
    }
}

// function loadingProductsByOrderId() {
//     return {
//         type: 'LOADING_PRODUCTS_BY_ORDER_ID',
//     }
// }



// const getProductsByOrderIdError = (error) => {
//     return {
//         type: 'GET_PRODUCTS_BY_ORDER_ID_ERROR',
//         error
//     }
// }