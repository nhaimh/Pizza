import './Cart.css';
import Product from './Product/Product';
import { connect } from 'react-redux';
import { increaseQty, decreaseQty, deleteCart, deleteAllCartProducts } from '../../redux/actions/cartActions';
import { createOrders } from '../../redux/actions/orderActions';

import { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const [modal, setModal] = useState(false);
    let totalCart = 0;

    props.cart.data.map(prod => {
        totalCart += prod.quantity * prod.price;
    })


    const increaseQtyFunction = (product) => {
        props.increaseQty(product)
    }

    const decreaseQtyFunction = (product) => {
        props.decreaseQty(product)
    }

    const deleteProductFunction = (product) => {
        props.deleteCart(product)
    }


    const onHandler = () => {
        let products = props.cart.data;

        setModal(false);
        props.deleteAllCartProducts();
        props.createOrders(products, props.userId, totalCart.toFixed(2));
    }
    return (
        <>
            {totalCart !== 0 && modal ? (

                <div className='BuyModal'>
                    <div className='BuyModalContent'>
                        <p id='buyTextModal'>Your payment was successful!</p>
                        <img id="payment" src='../../../../img/payment.png' width={45} height={45} />
                        <p><b>You`ve paid: </b> {`${totalCart}`}.00 lv</p>
                        <button id='buymodalCancel' onClick={() => onHandler()}>Return</button>
                        <p id='txtbuy' >You can see your orders <Link to='/orders' onClick={() => onHandler()}>here</Link> </p>
                    </div>

                </div>)
                : ''
            }


            <div className="cartBackground">

                <p id='cartTitle'>MY PRODUCTS:</p>

                {props.cart.data.length !== 0 ?
                    props.cart.data.map(product =>
                        <Product key={product._id}
                            product={product}
                            increase={increaseQtyFunction}
                            decrease={decreaseQtyFunction}
                            deleteFunction={deleteProductFunction}
                        />) :
                    <p id='cartText'>Your cart is empty</p>}

                <div id='totalDiv'>
                    <p><b>Total:</b></p>
                    <p id='price'>{totalCart.toFixed(2)} lv</p>
                    <button id='buy' onClick={() => setModal(true)}>BUY</button>
                    <button id='cancel' onClick={() => props.deleteAllCartProducts()}>CLEAR</button>
                </div>


            </div>
        </>

    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.cartProducts.cart,
        userId: state.auth.user?.id
    }
}


export default connect(mapStateToProps, {

    increaseQty,
    decreaseQty,
    deleteCart,
    deleteAllCartProducts,
    createOrders,

})(Cart)