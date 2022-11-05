import { combineReducers } from 'redux';
import { productReducers } from './productsReducers';
import { cartReducers } from './cartReducers';
import { userAuthReducers } from './userAuthReducers';
import { reducerUsers } from './userReducers';
import { feedbackReducer } from './feedbackReducers';
import { ordersReducers } from './orderReducers';
import { orderedProductsReducers } from './orderedProductsReducers';

const rootReducer = combineReducers({

    products: productReducers,
    cartProducts: cartReducers,
    auth: userAuthReducers,
    users: reducerUsers,
    feedback: feedbackReducer,
    orders: ordersReducers,
    orderedProducts: orderedProductsReducers

});

export default rootReducer;