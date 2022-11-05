import './Main.css';
import Card from './Card/Card.js';
import AllProducts from '../AllProducts/AllProducts.js';
import { useEffect, useState } from 'react';

import { addCart } from '../../redux/actions/cartActions';
import { fetchProducts } from '../../redux/actions/productsActions';
import { connect } from 'react-redux';



const Main = (props) => {

  let [show, setShow] = useState(false);
  let [state, setState] = useState([]);
  let [counter, setCounter] = useState(-1);
  let [prevCounter, setPrevCounter] = useState(0);
  let [style, setStyle] = useState('mainStyle');
  let cardsInfo = props.products.data;

  useEffect(() => {
    props.fetchProducts();
  }, [])

  useEffect(() => {
    let index = 0;
    let cards = [];

    if (cardsInfo.length > 0) {

      while (index < cardsInfo.length) {

        cards.push(cardsInfo.slice(index, index + 3));
        index += 3;
      }

      if (0 > counter) {

        setCounter(0);
        return;
      }

      if (counter >= cards.length) {
        setCounter(cards.length - 1);
        return;
      }

      if (prevCounter < counter) {

        setStyle('rightStyle');
        setPrevCounter(counter);

      } else if (prevCounter > counter) {

        setStyle('leftStyle')
        setPrevCounter(counter);
      }

      setState(cards[counter])


    }




  }, [counter, prevCounter])


  const addToCartProd = (item) => {

    props.addCart(item)
  }

  const leftHandler = () => {
    setCounter(--counter)
  }

  const rightHandler = () => {
    setCounter(++counter)
  }

  return (
    <>

      <div className='carousel'>
        <img id='imgLeft' src='../../../img/leftArrow.png' onClick={leftHandler} />

        <div className='gridDiv'>

          {state && state.length !== 0 ? state.map(x => <Card key={x._id} currentStyle={style} data={x} addToCart={addToCartProd} />) : <img id='logoCarousel' src='../../img/menu.png' />}

        </div>
        <img src='../../../img/rightArrow.png' id='imgRight' onClick={rightHandler} />
      </div>

      <div id='divList'>
        <p id='productsList' onClick={() => show ? setShow(false) : setShow(true)}>All Products</p>
        {show ? <AllProducts /> : ''}
      </div>

      <div id='allProductsDiv'><AllProducts /></div>
    </>


  )
}

const mapStateToProps = state => {
  return {
    products: state.products,
  }
}


export default connect(mapStateToProps, { fetchProducts, addCart })(Main)