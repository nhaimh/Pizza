const { Router } = require('express');
const router = Router();

const isAuthorization = require('../middlewares/isAuthorization');
const isAuthenticated = require('../middlewares/isAuthenticated');
const productService = require('../services/productService');

router.get("/", (req, res) => {
    productService.getAll(req.query)
        .then(products => res.json(products))

});

router.get('/:productId', async (req, res) => {
    let product = await productService.getOne(req.params.productId);
    res.json(product);
});

router.post("/", isAuthenticated, isAuthorization, async (req, res) => {

    try {
        await productService.create({ ...req.body });
        res.json({ ok: true })
    } catch (err) {

        let errorResponse = {
            error: {
                message: err.message
            }
        }
        res.status(400).send(errorResponse)
    }


});

router.put("/:productId", isAuthenticated, isAuthorization, async (req, res) => {

    try {
        await productService.updateOne(req.params.productId, req.body);
        res.json({ ok: true })
    } catch (err) {

        let errorResponse = {
            error: {
                message: err.message
            }
        }

        res.status(400).send(errorResponse)
    }

});

router.delete("/:productId", isAuthenticated, isAuthorization, async (req, res) => {
    await productService.deleteOne(req.params.productId);
    res.json({ ok: true })
});


module.exports = router;