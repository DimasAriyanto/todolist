const express = require('express');
const { getAll, create, remove, update, getOne } = require('../controllers/todo.controller');
const router = express.Router();

router.get('/', getAll);
router.post('/' ,create);
router.get('/:id', getOne);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;