import './Login.css';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchLoginUser } from '../../redux/actions/userAuthActions'
import { useEffect } from 'react';

let Login = (props) => {

    let navigate = useNavigate();

    const loginHandler = (e) => {
        e.preventDefault();


        let formData = new FormData(e.currentTarget);
        let username = formData.get('username');
        let password = formData.get('password');

        props.fetchLoginUser({ username, password })


    }
    useEffect(() => {
        if (props.isLogged) {
            navigate('/')
        }

    }, [props])


    return (
        <>
            {props.error && <div id='errorDiv'><p>{props.error}</p></div>}
            <div className='loginContent'>

                <h2>Login</h2>
                <form method='POST' id='loginForm' onSubmit={loginHandler}>
                    <label htmlFor='inputText'>Username:</label>
                    <input type='text' name='username' id='inputText' />
                    <label htmlFor='inputPass'>Password:</label>
                    <input type='password' name='password' id='inputPass' />
                    {props.isLoading ? <div className="loader" ></div> : <input type='submit' value='Login' />}
                </form>
            </div >
        </>

    )
}

const mapStateToProps = (state) => {
    return {
        isLogged: state.auth.isLoggedIn,
        error: state.auth.error,
        isLoading: state.auth.isLoading
    }
}
export default connect(mapStateToProps, { fetchLoginUser })(Login)