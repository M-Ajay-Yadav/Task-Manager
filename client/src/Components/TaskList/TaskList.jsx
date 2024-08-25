import React, { useState } from "react";
import axios from "axios";
import styles from "./TaskList.module.css";

const TaskList = ({ tasks, getTasks }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });
  const URI = "http://localhost:5000";

  // Filter tasks into To-Do and Completed
  const todoTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URI}/tasks/${id}`);
      getTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = async (id, completed) => {
    try {
      await axios.put(`${URI}/tasks/${id}`, { completed: !completed });
      getTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (task) => {
    setIsEditing(task._id);
    setEditData({ title: task.title, description: task.description });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`${URI}/tasks/${id}`, editData);
      setIsEditing(null);
      getTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* To-Do Tasks Section */}
      <h2>To-Do Tasks</h2>
      <ul className={styles.list}>
        {todoTasks.map((task) => (
          <li className={styles.listItem} key={task._id}>
            {isEditing === task._id ? (
              <>
                <input
                  className={styles.editInput}
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                />
                <input
                  className={styles.editInput}
                  type="text"
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                />
                <button
                  className={`${styles.button} ${styles.updateButton}`}
                  onClick={() => handleUpdate(task._id)}
                >
                  Update
                </button>
                <button
                  className={`${styles.button} ${styles.cancelButton}`}
                  onClick={() => setIsEditing(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{task.title}:</span> <span>{task.description}</span>
                <button
                  className={`${styles.button} ${styles.editButton}`}
                  onClick={() => handleEdit(task)}
                >
                  Edit
                </button>
              </>
            )}
            <button
              className={`${styles.button} ${styles.completeButton}`}
              onClick={() => handleToggle(task._id, task.completed)}
            >
              Complete
            </button>
            <button
              className={`${styles.button} ${styles.deleteButton}`}
              onClick={() => handleDelete(task._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Completed Tasks Section */}
      <h2>Completed Tasks</h2>
      <ul className={styles.list}>
        {completedTasks.map((task) => (
          <li className={styles.listItem} key={task._id}>
            <span>{task.title}:</span> <span>{task.description}</span>
            <button
              className={`${styles.button} ${styles.undoButton}`}
              onClick={() => handleToggle(task._id, task.completed)}
            >
              Undo
            </button>
            <button
              className={`${styles.button} ${styles.deleteButton}`}
              onClick={() => handleDelete(task._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
