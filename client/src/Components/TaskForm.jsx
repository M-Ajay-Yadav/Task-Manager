import React, { useState } from 'react';
import axios from 'axios';
import styles from './TaskForm.module.css';

const TaskForm = ({ getTasks }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/tasks', { title, description });
            getTasks();
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                className={styles.input}
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                className={styles.textarea}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button className={styles.button} type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
