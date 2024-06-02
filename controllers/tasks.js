const Task = require("../models/tasks");

//function to get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
};

//function to get task by id
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).send("Task not found");
    } else {
      res.send(task);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// function to create new task

const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};

// function to update task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) {
      res.status(404).send("Task not found");
    } else {
      res.send(task);
      res.status(204).send("Task updated");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// function to delete task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404).send("Task not found");
    } else {
      res.send(task);
      res.status(200).send("Task deleted");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
