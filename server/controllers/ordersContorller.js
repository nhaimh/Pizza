const { Router } = require('express');
const ordersService = require('../services/ordersService')
const router = Router();

router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    ordersService.getAllOrders(userId)
        .then(orders => res.json(orders))
})

router.get('/list/:orderId', (req, res) => {
    const { orderId } = req.params;
    ordersService.getProductsByOrderId(orderId)
        .then(products => res.json(products))
})

router.put(`/:id`, (req, res) => {
    ordersService.putOrders(req.params.id, req.body)
        .then(order => res.json(order))
})

router.post(`/`, async (req, res) => {

    const orders = await ordersService.createOrder(req.body);
    res.json({ ok: true })

})

module.exports = router;