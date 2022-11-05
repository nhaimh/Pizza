import './ErrorPage.css';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='contentError'>
            <h2>Page Not Found</h2>
            <img src='../../../img/page404.png' width={400} height={400} />
            <p><b>This page doesn`t exist.</b></p>
            <p>Would you like to go to Home page? Click <Link to='/'>here</Link></p>
        </div>
    )
}

export default ErrorPage