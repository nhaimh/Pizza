import { CREATE_PRODUCT, DELETE_PRODUCT, FETCH_PRODUCTS_LOADING, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_ERROR, UPDATE_PRODUCT } from '../types/actionTypes';
import { api } from '../../services/api';
import { getLocalStorage } from '../../services/storageService';

export const deleteProduct = (id, history) => {
    return async dispatch => {
        const product = await api.delete(`/products/${id}`, null, {
            'Authorization': 'Bearer ' + getLocalStorage()?.token,
            'Content-Type': 'application/json',
        })
        if (product.ok) {
            dispatch(removeProduct(id))
            history('/')
        }
    }
}

export const fetchProducts = () => {
    return async dispatch => {

        try {
            dispatch(fetchProductsLoading)
            // let products = await productService.getAllProducts();
            let products = await api.get('/products');

            dispatch(fetchProductsSuccess(products))
        } catch (error) {
            dispatch(fetchProductsError(error.message))
        }
    }
}

export const editProduct = (product, history) => {
    return async dispatch => {
        try {
            const response = await api.put(`/products/${product._id}`, product, {
                'Authorization': 'Bearer ' + getLocalStorage()?.token,
                'Content-Type': 'application/json',
            })
            if (response.ok) {
                dispatch(updateProduct(product))
                history(`/details/${product._id}`)
            }
        } catch (error) {

        }
    }
}

export const createProduct = (product, history) => {
    return async (dispatch) => {

        try {
            dispatch(fetchProductsLoading())
            let productResponse = await api.post(`/products`, product, {
                'Authorization': 'Bearer ' + getLocalStorage()?.token,
                'Content-Type': 'application/json',
            });

            if (productResponse.ok) {
                dispatch(createNewProduct(product))
                history('/')
            }

        } catch (error) {
            dispatch(fetchProductsError(error.message))
        }
    }
}

const createNewProduct = (product) => {
    return {
        type: CREATE_PRODUCT,
        payload: product
    }
}

const removeProduct = (id) => {
    return {
        type: DELETE_PRODUCT,
        payload: id
    }
}

const fetchProductsLoading = () => {
    return {
        type: FETCH_PRODUCTS_LOADING
    }
}

const fetchProductsSuccess = products => {

    return {
        type: FETCH_PRODUCTS_SUCCESS,
        payload: products
    }
}

const fetchProductsError = error => {
    return {
        type: FETCH_PRODUCTS_ERROR,
        error
    }
}

const updateProduct = (product) => {
    return {
        type: UPDATE_PRODUCT,
        payload: product
    }
}


