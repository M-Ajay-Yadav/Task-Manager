const Task = require('../models/Task');

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Get tasks error:", error.message);
        res.status(500).json({ message:"internal server error" });
    }
};

const createTask = async (req, res) => {
    const task = new Task(req.body);
    try {
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        console.error("Create task error:", error.message);
        res.status(400).json({ message:"Bad request" });
    }
};

const updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error("Update task error:", error.message);
        res.status(400).json({ message:"Bad request" });
    }
};

const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
        console.error("Delete task error:", error.message);
        res.status(400).json({ message:"Bad request" });
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};
