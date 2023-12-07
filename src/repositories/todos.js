const { Transaction } = require('sequelize');
const { sequelize, Todo } = require('../models');
const { BadRequestError, NotFoundError } = require('../errors');

const getTodoAll = async (req) => {
  const { activity_group_id } = req.query;
  const result = await sequelize.transaction(
    { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
    async (transaction) => {
      if (activity_group_id) {
        const todos = await Todo.findAll(
          {
            where: {
              activity_group_id: activity_group_id,
            },
          },
          { transaction }
        );
        return todos;
      } else {
        const todos = await Todo.findAll({ transaction });
        return todos;
      }
    }
  );

  return result;
};

const getTodoById = async (id) => {
  const result = await sequelize.transaction(
    { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
    async (transaction) => {
      const todo = await Todo.findByPk(id, { transaction });

      return {
        id: todo.id,
        title: todo.title,
        activity_group_id: todo.activityGroupId,
        is_active: todo.isActive,
        priority: todo.priority,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
      };
    }
  );

  return result;
};

const createTodo = async (req) => {
  const { activity_group_id, title, priority } = req.body;
  if (!title) throw new BadRequestError('title cannot be null');

  const result = await sequelize.transaction(
    { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
    async (transaction) => {
      const newTodo = await Todo.create(
        {
          title: title,
          activityGroupId: activity_group_id,
          priority: priority,
        },
        { transaction }
      );
      return {
        id: newTodo.id,
        title: newTodo.title,
        activity_group_id: newTodo.activityGroupId,
        is_active: newTodo.isActive,
        priority: newTodo.priority,
        createdAt: newTodo.createdAt,
        updatedAt: newTodo.updatedAt,
      };
    }
  );

  return result;
};

const deleteTodo = async (id) => {
  const result = await sequelize.transaction(
    { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
    async (transaction) => {
      await Todo.destroy({
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

const updateTodo = async (req) => {
  const { id } = req.params;
  const { title, priority, is_active } = req.body;

  const result = await sequelize.transaction(
    { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
    async (transaction) => {
      const updated = await Todo.update(
        {
          title: title,
          priority: priority,
          is_active: is_active,
        },
        { where: { id: id } },
        { transaction }
      );

      const updatedTodoData = await Todo.findOne(
        { where: { id: id } },
        {
          transaction,
        }
      );

      return {
        id: updatedTodoData.id,
        title: updatedTodoData.title,
        activityGroupId: updatedTodoData.activityGroupId,
        isActive: updatedTodoData.isActive,
        priority: updatedTodoData.priority,
        createdAt: updatedTodoData.createdAt,
        updatedAt: updatedTodoData.updatedAt,
      };
    }
  );

  return result;
};

const checkAvailableTodo = async (id) => {
  const result = await Todo.findByPk(id);

  if (!result) throw new NotFoundError(`Todo with ID ${id} Not Found`);
};

module.exports = {
  getTodoAll,
  getTodoById,
  createTodo,
  deleteTodo,
  updateTodo,
  checkAvailableTodo,
};
