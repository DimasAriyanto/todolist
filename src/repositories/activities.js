const { Transaction } = require('sequelize');
const { sequelize, Activity } = require('../models');
const { BadRequestError, NotFoundError } = require('../errors');

const getActivityAll = async () => {
  const result = await sequelize.transaction(
    { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
    async (transaction) => {
      const activities = await Activity.findAll({ transaction });
      return activities;
    }
  );

  return result;
};

const getActivityById = async (req) => {
  const { id } = req.params;
  const result = await sequelize.transaction(
    { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
    async (transaction) => {
      const activity = await Activity.findByPk(id, { transaction });

      return {
        id: activity.id,
        title: activity.title,
        email: activity.email,
        createdAt: activity.createdAt,
        updatedAt: activity.updatedAt,
      };
    }
  );

  return result;
};

const createActivity = async (activity) => {
  if (activity.email === undefined) throw new BadRequestError('email cannot be null');
  if (activity.title === undefined) throw new BadRequestError('title cannot be null');

  const result = await sequelize.transaction(
    { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
    async (transaction) => {
      const check = await Activity.findOne({
        where: {
          email: activity.email,
        },
      });

      if (check) throw new BadRequestError('Email duplicated');
      const newActivity = await Activity.create(activity, { transaction });
      return newActivity;
    }
  );

  return result;
};

const deleteActivity = async (id) => {
  const result = await sequelize.transaction(
    { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
    async (transaction) => {
      await Activity.destroy({
        where: {
          id: id,
        },
        transaction,
      });

      return {};
    }
  );

  return result;
};

const updateActivity = async (req) => {
  const { id } = req.params;
  const { title } = req.body;
  const result = await sequelize.transaction(
    { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
    async (transaction) => {
      await Activity.update(
        { title: title },
        {
          where: { id: id },
          transaction,
        }
      );

      const updatedActivityData = await Activity.findByPk(id, {
        transaction,
      });

      return {
        id: updatedActivityData.id,
        title: updatedActivityData.title,
        email: updatedActivityData.email,
        createdAt: updatedActivityData.createdAt,
        updatedAt: updatedActivityData.updatedAt,
      };
    }
  );

  return result;
};

const checkAvailableActivity = async (id) => {
  const result = await Activity.findByPk(id);

  if (!result) throw new NotFoundError(`Activity with ID ${id} Not Found`);
};

module.exports = {
  getActivityAll,
  getActivityById,
  createActivity,
  deleteActivity,
  updateActivity,
  checkAvailableActivity,
};
