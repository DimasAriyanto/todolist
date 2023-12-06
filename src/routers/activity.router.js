const express = require('express');
const { getAll, create, getOne, update, remove } = require('../controllers/activity.controller');
// const { validateActivity } = require('./validator');
const router = express.Router();

router.get('/', getAll);
router.post('/', create);
router.get('/:id', getOne);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;