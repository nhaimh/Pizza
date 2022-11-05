import './Product.css';

const Product = ({
    product,
    increase,
    decrease,
    deleteFunction
}) => {

    return (
        <div className="divProduct">
            <div className='infoDiv'>
                <img src={product.imageUrl}></img>
                <p id='titlePizza'>{product.title}</p>
                <p id='descriptionProduct'>{product.description}</p>
                <p><b>Price:</b> {product.price} lv</p>

                <div className='btnsContainer'>

                    <div className='btns' onClick={() => increase(product)}>+</div>

                        <p>{product.quantity}</p>

                    <div className='btns' onClick={() => decrease(product)}>-</div>

                    <p id='checkboxId' onClick={() => deleteFunction(product._id)}>x</p>
                </div>

                
            </div>

        </div>
    )
}

export default Product;