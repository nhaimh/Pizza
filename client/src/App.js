import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Main from './components/Main/Main.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import CreatePizza from './components/CreatePizza/CreatePizza.js';
import About from './components/About/About.js';
import Cart from './components/Cart/Cart';
import Details from './components/DetailsProduct/DetailsProduct';
import ErrorPage from './components/ErrorPage/ErrorPage';
import EditProduct from './components/EditProduct/EditProduct.js';
import Users from './components/Users/Users';
import FeedBack from './components/FeedBack/FeedBack.js';
import EditFeedback from './components/EditFeedback/EditFeedback.js';
import MyOrders from './components/MyOrders/MyOrders.js';

import { Routes, Route } from 'react-router-dom';

import './App.css';


function App() {
  return (
    <div className="App">
      <Header />

      <div className='mainContent'>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create-pizza' element={<CreatePizza />} />
          <Route path='/about' element={<About />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/details/:id' element={<Details />} />
          <Route path='/details/edit/:id' element={<EditProduct />} />
          <Route path='/feedback' element={<FeedBack />} />
          <Route path='/feedback/edit/:id' element={<EditFeedback />} />
          <Route path='/users' element={<Users />} />
          <Route path='/orders' element={<MyOrders />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>


      <Footer />
    </div>
  );
}

export default App;
