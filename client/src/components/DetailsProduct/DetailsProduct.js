import './DetailsProduct.css';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { addCart } from '../../redux/actions/cartActions';
import { deleteProduct } from '../../redux/actions/productsActions';
import { useNavigate } from 'react-router-dom';

const DetailsProduct = (props) => {

    const [modal, setModal] = useState(false);

    let [image, setImage] = useState(true);
    let [text, setText] = useState('');

    let params = useParams();
    let history = useNavigate();

    const product = props.products.find(prod => prod._id === params.id);

    const deleteHandler = () => {
        props.deleteProduct(product._id, history)
    }


    function addToCart(product) {

        setText('Added');
        setImage(false);

        setTimeout(() => {
            setText('')
            setImage(true)
        }, 500)

        props.addCart(product)


    }

    if (product) {
        return (
            <>
                {modal ? (

                    <div className='modal'>
                        <div className='modalContent'>
                            <p id='txtModal'>Do you want to delete this product?</p>
                            <button id="modalDel" onClick={deleteHandler}>Delete</button>
                            <button id='modalCancel' onClick={() => setModal(false)}>Cancel</button>
                        </div>

                    </div>)
                    : ''
                }

                <div id='detailsId'>
                    <h2>{product.title}</h2>
                    <img src={product.imageUrl} id='detailsImage' alt='productDetails' />
                    <p><b>{product.description}</b></p>
                    <p id='price'>Price: {product.price} lv.</p>
                    <div id='detailBtns'>

                        {props.user &&
                            <>
                                {image && <div className='imgCartDetails' onClick={() => addToCart(product)} />}
                                {text ? <p id='txtDetails'>{text}</p> : ''}

                                {(props.user.role === "editor" || props.user.role === 'admin') &&
                                    <>
                                        <Link to={`/details/edit/${product._id}`} id="detailsEditBtn">Edit</Link>
                                        <button id="detailsDeleteBtn" onClick={() => setModal(true)}>Delete</button>
                                    </>
                                }

                            </>
                        }
                        <Link to='/' id="detailsBackBtn">Back</Link>

                    </div>

                </div>
            </>

        )
    }

    return null

}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        products: state.products.data
    }

}

export default connect(mapStateToProps, { addCart, deleteProduct })(DetailsProduct);