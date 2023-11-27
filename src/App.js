import React, { useState } from 'react';
import AddTask from './components/AddTask';
import DisplayTasks from './components/DisplayTask';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (text) => {
    const newTask = {
      id: Date.now().toString(),
      text,
      important: false,
      complete: false,
    };
    setTasks([newTask, ...tasks]);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleImportant = (taskId) => {
    const updatedTasks = tasks.map((task) => (
      task.id === taskId ? { ...task, important: !task.important } : task
    ));
    setTasks(updatedTasks);
  };

  const toggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) => (
      task.id === taskId ? { ...task, complete: !task.complete } : task
    ));
    setTasks(updatedTasks);
  };

  // const editTask = (taskId, newText) => {
  //   const updatedTasks = tasks.map((task) => (
  //     task.id === taskId ? { ...task, text: newText } : task
  //   ));
  //   setTasks(updatedTasks);
  // };

  return (
    <div>
      <h1>My To-Do List</h1>
      <AddTask addTask={addTask} />
      <DisplayTasks
        tasks={tasks}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
        toggleImportant={toggleImportant}
        setTasks={setTasks}
      />
    </div>
  );
};

export default App;
