import './CreatePizza.css';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProduct } from '../../redux/actions/productsActions';

const CreatePizza = (props) => {

    const history = useNavigate();

    const createHandler = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let title = formData.get('username');
        let description = formData.get('description');
        let imageUrl = formData.get('image');
        let price = formData.get('price');

        props.createProduct({ title, description, imageUrl, price }, history)

    }

    return (
        <>
            {props.error && <div id='errorDiv'><p>{props.error}</p></div>}
            <div className='createPizza'>
                <h2>Create Pizza</h2>
                <form method='POST' id='loginForm' onSubmit={createHandler}>
                    <label htmlFor='inputText'>Title:</label>
                    <input type='text' name='username' id='inputText' />
                    <label htmlFor='inputDescription'>Description:</label>
                    <input type='text' name='description' id='inputDescription' />
                    <label htmlFor='inputImage'>Image Url:</label>
                    <input type='text' name='image' id='inputImage' />
                    <label htmlFor='inputImage'>Price:</label>
                    <input type='number' name='price' id='inputImage' />
                    <div>
                        {props.isLoading ? <div className="loader" ></div> : <input type='submit' value='Create' />}
                    </div>

                </form>
            </div>
        </>

    )
}

const mapStateToProps = (state) => {
    return {
        products: state.products.data,
        isLoading: state.products.isLoading,
        error: state.products.error
    }
}

export default connect(mapStateToProps, { createProduct })(CreatePizza);