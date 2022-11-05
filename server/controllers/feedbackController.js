const { Router } = require('express');
const router = Router();

const isAuthorization = require('../middlewares/isAuthorization');
const isAuthenticated = require('../middlewares/isAuthenticated');
const feedbackService = require('../services/feedbackService');


router.get('/', (req, res) => {
    feedbackService.getAllComments()
        .then(comments => res.json(comments))
});

router.post('/', isAuthenticated, (req, res) => {
    feedbackService.createComment(req.body)
        // .then(() => res.json({ ok: true }))
        .then(comment => res.json(comment))
        .catch(error => res.status(400).json({ message: `${error}` }))
});

router.get('/:id', (req, res) => {
    feedbackService.getOneComment(req.params.id)
        .then(comment => res.json(comment))
});

router.put('/:id', async (req, res) => {

    try {
        await feedbackService.editOneComment(req.params.id, req.body)
        return res.json({ ok: true });
    } catch (error) {
        res.json(400).send({ message: 'something went wrong' })
    }

})

router.delete("/:id", async (req, res) => {
    await feedbackService.deleteOneComment(req.params.id);
    res.json({ ok: true })
});




module.exports = router;