import './Register.css';

import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchRegisterUser } from '../../redux/actions/userAuthActions';
import { useEffect } from 'react';

const Register = (props) => {
    let navigate = useNavigate();
    // let [error, setError] = useState('');

    const registerHandler = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let username = formData.get('username');
        let password = formData.get('password');
        let repeatPassword = formData.get('repeat-password');

        props.fetchRegisterUser({ username, password, repeatPassword })

    }

    useEffect(() => {
        if (props.isLogged) {
            navigate('/')
        }

    }, [props])

    return (
        <>
            {props.error && <div id='errorDiv'><p>{props.error}</p></div>}
            <div className='registerContent'>
                <h2>Register</h2>
                <form method='POST' id='loginForm' onSubmit={registerHandler}>
                    <label htmlFor='inputText'>Username:</label>
                    <input type='text' name='username' id='inputText' />
                    <label htmlFor='inputPass'>Password:</label>
                    <input type='password' name='password' id='inputPass' />
                    <label htmlFor='inputPass'>Repeat Password:</label>
                    <input type='password' name='repeat-password' id='inputPass' />
                    {props.isLoading ? <div className="loaderRegister"></div> : <input type='submit' value='Register' />}
                </form>
            </div>
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

export default connect(mapStateToProps, { fetchRegisterUser })(Register);