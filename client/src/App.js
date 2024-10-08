import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './Components/TaskForm/TaskForm';
import Main from './Components/Main/Main';
import styles from './App.module.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const URI = "http://localhost:5000";

    const getTasks = async () => {
        try {
            const response = await axios.get(`${URI}/tasks`);
            setTasks(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className={styles.container}>
            <h1>Task Manager</h1>
            <TaskForm getTasks={getTasks} />
            <Main tasks={tasks} getTasks={getTasks} />
        </div>
    );
};

export default App;
