const {Router} = require('express');
const router = Router();

const userService = require('../services/userService');


router.get('/', (req, res) => {
    userService.getAllUsers()
     .then(users => res.status(200).json(users))
});

router.put('/:id', (req, res) => {
    userService.editUser(req.params.id, req.body)
       .then(() => res.json({ok: true}))
});

router.get('/:id', (req, res) => {
    userService.getOneUser(req.params.id)
      .then(user => res.json(user))
});

router.delete('/:id', (req, res) => {
    userService.deleteUser(req.params.id, req.body)
       .then(() => res.json({ok: true}))
})



module.exports = router;
