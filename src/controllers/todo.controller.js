const todoRepository = require('../repositories/todos');
const activityRepository = require('../repositories/activities');

const getAll = async (req, res, next) => {
  try {
    const result = await todoRepository.getTodoAll(req);
    res.status(200).json({
      status: 'Success',
      message: 'Success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    await todoRepository.checkAvailableTodo(id);
    
    const result = await todoRepository.getTodoById(req);
    res.status(200).json({
      status: 'Success',
      message: 'Success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { activity_group_id: id } = req.body;
    await activityRepository.checkAvailableActivity(id);

    const result = await todoRepository.createTodo(req);
    res.status(201).json({
      status: 'Success',
      message: 'Success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await todoRepository.deleteTodo(id);
    res.status(200).json({
      status: 'Success',
      message: 'Success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    await todoRepository.checkAvailableTodo(id);

    const result = await todoRepository.updateTodo(req);
    res.status(200).json({
      status: 'Success',
      message: 'Success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
