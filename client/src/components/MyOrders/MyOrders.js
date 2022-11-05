import './MyOrders.css';
import { connect } from 'react-redux';
import { getProductsByOrderId } from '../../redux/actions/orderedProductsAction';
import { editOrder, getOrdersByUserId } from '../../redux/actions/orderActions';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyOrders = (props) => {

    const { isLoading, data, error } = props.orders;
    const history = useNavigate();

    useEffect(() => {

        props.getOrdersByUserId(props.user.id)
    }, []);


    if (isLoading) {
        return <div className='loaderContent'>
            <p><b>Loading...</b></p>
            <img src="https://codemyui.com/wp-content/uploads/2019/01/Rotating-Pizza-Slice-Preloader.gif" width={400} />
        </div>
    }
    if (error) {

        return <div className='errorContent'>
            <h2>Ooops, something went wrong!</h2>
        </div>

    }

    const orderUpdateHandler = (order) => {

        if (props.user.role == 'admin') {

            let newOrder = { ...order, status: 'Processed' }
            props.editOrder(newOrder, history)
            props.getOrdersByUserId(props.user.id)
        }
    }


    return (
        <>
            <div className='myOrdersContent'>
                <h2>My Orders List</h2>
                {data.length === 0 ?
                    <p id='TextOrder'>Your order list is empty</p> :
                    <div className='ordersList'>
                        <ul>
                            {data.map((item, index) =>
                                <li className='listOrders' key={index} >
                                    <p onClick={() => props.getProductsByOrderId(item.orderId)}>OrderId: {item.orderId}</p>
                                    <p>Created Date: {item.createdDate}</p>
                                    <p>Total: {item.orderTotal} lv</p>
                                    <p className={`${item.status == 'In Progress' ? 'status' : 'statusOK'}`} onClick={() => orderUpdateHandler(item)}>Status: {item.status}</p>
                                </li>
                            )}

                        </ul>
                    </div>
                }
            </div >
            <div className='myOrdersContent'>
                <h2>My Products List</h2>
                <ul>
                    {
                        props.orderedProducts.map(function (item, index) {

                            return <li key={index} className='myProductsList'>
                                <h2>{item.title}</h2>
                                <img src={item.imageUrl} width={200} />
                                <p>Price: {item.price}lv</p>
                                <p>Description: {item.description}</p>
                            </li>;
                        })
                    }
                </ul>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders,
        orderedProducts: state.orderedProducts.data,
        user: state.auth.user
    }

}

export default connect(mapStateToProps, { getProductsByOrderId, getOrdersByUserId, editOrder })(MyOrders)