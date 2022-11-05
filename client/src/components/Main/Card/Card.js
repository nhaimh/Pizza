import './Card.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import * as storageService from '../../../services/storageService'

const Card = ({
    data,
    currentStyle,
    addToCart
}) => {

    let user = storageService.getLocalStorage()?.username;
    let [text, setText] = useState('');
    let [image, setImage] = useState(true);


    function addToCartFunction() {

        if (addToCart) addToCart(data)

        setText('Added');
        setImage(false);

        setTimeout(() => {
            setText('')
            setImage(true)
        }, 500)



    }


    return (

        <div className={currentStyle}>
            <img className='imageDiv' src={data.imageUrl} />
            <h5>{data.title}</h5>
            <div className='cardInfo'>

                <Link to={`/details/${data._id}`} id='detailsBtn'>Details</Link>
                
                {user && (
                    <>
                        {image && <div className='imgCart' onClick={addToCartFunction} />}
                        {text ? <p id='txt'>{text}</p> : ''}
                    </>

                )}

                <p className='pCard'>price: {data.price} lv.</p>

            </div>


        </div>
    )
}


export default Card;