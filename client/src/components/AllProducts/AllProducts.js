import './AllProducts.css';
import Card from '../Main/Card/Card';
import { useEffect, useState } from 'react';
import { addCart } from '../../redux/actions/cartActions';
import { fetchProducts } from '../../redux/actions/productsActions';
import { connect } from 'react-redux';


const AllProducts = (props) => {

  useEffect(() => {

    props.fetchProducts()
  }, [])

  // props.products.isLoading.error

  const addToCartProd = (item) => {

    props.addCart(item)
  }

  return (

    <>
      {props.error && <div id='errorDiv'><p>{props.error}</p></div>}
      <div className='allLists'>
        <div className='gridDivList'>
          {props.products ? props.products.data.length > 0 && props.products.data.map(product => <Card key={product._id} data={product} currentStyle='mainStyle' addToCart={addToCartProd} />) : <p>Something went wrong!</p>}
        </div>

      </div>
    </>


  )
}

const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.auth.user,
    error: state.products.error
  }
}

export default connect(mapStateToProps, { fetchProducts, addCart })(AllProducts);