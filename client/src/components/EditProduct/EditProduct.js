import './EditProduct.css'
import { useNavigate, useParams } from 'react-router-dom';
import { editProduct } from '../../redux/actions/productsActions';
import { connect } from 'react-redux';

const EditProduct = (props) => {
    const history = useNavigate();
    const { id } = useParams();

    const product = props.products.find(product => product._id === id);

    const editHandler = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        const product = {
            _id: id,
            title: formData.get('username'),
            description: formData.get('description'),
            imageUrl: formData.get('image'),
            price: Number(formData.get('price'))

        }

        props.editProduct(product, history)

    }


    if (product) {
        return (
            <>

                <div className='editContent'>
                    <h2>Edit Pizza</h2>
                    <form method='POST' id='editForm' onSubmit={editHandler}>
                        <label htmlFor='inputText'>Title:</label>
                        <input type='text' name='username' id='inputText' defaultValue={product.title} />
                        <label htmlFor='inputDescription' >Description:</label>
                        <input type='text' name='description' id='inputDescription' defaultValue={product.description} />
                        <label htmlFor='inputImage' >Image Url:</label>
                        <input type='text' name='image' id='inputImage' defaultValue={product.imageUrl} />
                        <label htmlFor='inputImage' >Price:</label>
                        <input type='number' name='price' id='inputImage' defaultValue={product.price} />
                        <input type='submit' defaultValue='Edit' />
                    </form>
                </div>
            </>

        )
    }

    return null
}

const mapStateToProps = (state) => {
    return {
        products: state.products.data
    }
}



export default connect(mapStateToProps, { editProduct })(EditProduct);