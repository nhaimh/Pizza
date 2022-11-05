import './Nav.css';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchLogout } from '../../../redux/actions/userAuthActions';
import { getOrdersByUserId } from '../../../redux/actions/orderActions';

const Nav = (props) => {

  const history = useNavigate();

  const onLogoutHandler = () => {
    props.fetchLogout(history)
  }

  // const loadOrders = () => {
  //   props.getOrdersByUserId(props.user.id)
  // }

  return (
    <>
      <div className='navDiv'>

        <div className='Logo'>
          <img src='../../img/logo1.png' />
          <p>Pizza Borano</p>

        </div>

        <div className='allLinks'>
          {props.isLogged ?
            <>
              <p className='userName'>
                <Link to='/orders' id='userNameLink'>
                  Welcome, {props.user.username}
                </Link>
              </p>
              <Link to="/">Home</Link>
              {props.user && (props.role == 'admin' || props.role == 'editor') && <Link to="/create-pizza">Create Pizza</Link>}
              <Link to="/about">About</Link>
              <Link to="/feedback" id='feedback'>Feedback</Link>
              {props.user && props.role == 'admin' && <Link to="/users" >Users</Link>}
              <Link to="#" onClick={onLogoutHandler} id='logout'>Logout</Link>
              <Link to="/cart"><div id='cart' /></Link>
              <div id='numCart'>{props.cart.counter}</div>
            </>
            :
            <>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>

            </>
          }


        </div>


      </div>
      {props.error && <div id='errorDiv'><p>{props.error}</p></div>}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    cart: state.cartProducts.cart,
    isLogged: state.auth.isLoggedIn,
    user: state.auth.user,
    role: state.auth.user?.role,
    error: state.auth.error
  }
}
export default connect(mapStateToProps, { fetchLogout, getOrdersByUserId })(Nav);