import React, { useState } from 'react';
import AddTask from './components/AddTask';
import DisplayTasks from './components/DisplayTask';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const addTask = (text, category) => {
    const newTask = {
      id: Date.now(),
      text,
      important: false,
      complete: false,
      category,
    };
    setTasks([newTask, ...tasks]);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleImportant = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, important: !task.important } : task
    );
    setTasks(updatedTasks);
  };

  const toggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, complete: !task.complete } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <AddTask addTask={addTask} setSelectedCategory={setSelectedCategory} />
      <DisplayTasks
        tasks={tasks}
        deleteTask={deleteTask}
        toggleImportant={toggleImportant}
        toggleComplete={toggleComplete}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default App;
