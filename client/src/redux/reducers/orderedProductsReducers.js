import { LOADING_PRODUCTS, GET_PRODUCTS_BY_ORDER_ID_SUCCESS, ORDERED_PRODUCTS_ERROR, } from '../types/actionTypes'
let initialState = {
    error: null,
    isLoading: false,
    data: [],
}

export const orderedProductsReducers = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_PRODUCTS:
            return {
                ...state,
                error: null,
                isLoading: true,
                data: [],
            }
        case GET_PRODUCTS_BY_ORDER_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                data: action.payload,
            };

        case ORDERED_PRODUCTS_ERROR:
            return {
                ...state,
                error: action.error,
                isLoading: false
            };

        default: return state
    }

}