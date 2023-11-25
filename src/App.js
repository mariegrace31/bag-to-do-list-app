import React, { useState, useEffect } from 'react';
import AddTask from './components/AddTask';
import DisplayTasks from './components/DisplayTask';

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Add Task
  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      important: false,
      complete: false,
      category,
    };
    setTasks([newTask, ...tasks]);
  };

  // Delete Task
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Toggle Important
  const toggleImportant = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, important: !task.important } : task
    );
    setTasks(updatedTasks);
  };

  // Toggle Complete
  const toggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, complete: !task.complete } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <AddTask addTask={addTask} />
      <DisplayTasks
        tasks={tasks}
        deleteTask={deleteTask}
        toggleImportant={toggleImportant}
        toggleComplete={toggleComplete}
      />
    </div>
  );
};

export default App;
