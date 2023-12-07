const activityRepository = require('../repositories/activities');

const getAll = async (req, res, next) => {
  try {
    const result = await activityRepository.getActivityAll();
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
    await activityRepository.checkAvailableActivity(id);
    const result = await activityRepository.getActivityById(req);
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
    const result = await activityRepository.createActivity(req);
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
    await activityRepository.checkAvailableActivity(id);
    const result = await activityRepository.deleteActivity(id);
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
    await activityRepository.checkAvailableActivity(id);
    const result = await activityRepository.updateActivity(req);
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
