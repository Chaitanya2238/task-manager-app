const Task = require('../models/Task');

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  try {
    const task = await Task.create({
      userId: req.user.id,
      title,
      description,
      status,
      dueDate,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  try {
    const task = await Task.findByPk(req.params.id);

    if (task) {
      if (task.userId !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      task.title = title || task.title;
      task.description = description || task.description;
      task.status = status || task.status;
      task.dueDate = dueDate || task.dueDate;

      await task.save();
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (task) {
      if (task.userId !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      await task.destroy();
      res.json({ message: 'Task removed' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
