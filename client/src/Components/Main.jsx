import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import styles from './Main.module.css';

const Main = ({ tasks, getTasks }) => {
    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className={styles.container}>
            <h1>Task List</h1>
            <TaskList tasks={tasks} getTasks={getTasks} />
        </div>
    );
};

export default Main;
