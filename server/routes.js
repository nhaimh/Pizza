const { Router } = require('express');
const router = Router();
// const path = require('path');

const feedbackController = require('./controllers/feedbackController');
const productController = require('./controllers/productController');
const authController = require('./controllers/authController');
const usersController = require('./controllers/userController');
const ordersController = require('./controllers/ordersContorller');

router.use('/api/products', productController);
router.use('/api/auth', authController);
router.use('/api/feedback', feedbackController);
router.use('/api/users', usersController);
router.use('/api/orders', ordersController)
// router.get("*" ,(req, res) =>{
//     res.sendFile(path.join(__dirname,'public', 'index.html'))
// });


module.exports = router;