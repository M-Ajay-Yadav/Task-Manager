import React, { useState } from "react";
import axios from "axios";
import styles from "./TaskList.module.css";

const TaskList = ({ tasks, getTasks }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });
  const URI = "http://localhost:5000";

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
      await axios.put(`http://localhost:5000/tasks/${id}`, {
        completed: !completed,
      });
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
      await axios.put(`http://localhost:5000/tasks/${id}`, editData);
      setIsEditing(null);
      getTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <li className={styles.listItem} key={task._id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => handleToggle(task._id, task.completed)}
          />
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
            className={`${styles.button} ${styles.deleteButton}`}
            onClick={() => handleDelete(task._id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
