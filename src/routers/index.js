const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const Activity = require('./activity.router');
const Todo = require('./todo.router');

const notFoundMiddleware = require('./../middlewares/not-found');
const handdleErrorMiddleware = require('./../middlewares/handle-error');

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to api todolist',
  });
});
router.use('/activity-groups', Activity);
router.use('/todo-items', Todo);

router.use(notFoundMiddleware);
router.use(handdleErrorMiddleware);

module.exports = router;
