import React, { useState, useEffect } from 'react';
import AddTask from './components/AddTask';
import DisplayTasks from './components/DisplayTask';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState({
    id: '',
    text: '',
  });

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const addTask = (text) => {
    const newTask = {
      id: tasks.length + 1,
      text,
      important: false,
      complete: false,
    };
    const newTasks = [newTask, ...tasks];

    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleImportant = (taskId) => {
    if (tasks?.filter((task) => task.id === taskId)[0]?.complete) return;

    const updatedTasks = tasks.map((task) => (
      task.id === taskId ? { ...task, important: !task.important } : task
    ));

    const sortedTasks = updatedTasks.sort((a, b) => {
      if (a.important && !b.important) return -1;
      if (!a.important && b.important) return 1;
      return 0;
    });

    setTasks(sortedTasks);
  };

  const toggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) => (
      task.id === taskId ? { ...task, complete: !task.complete } : task
    ));

    const sortedTasks = updatedTasks.sort((a, b) => {
      if (a.complete && !b.complete) return 1;
      if (!a.complete && b.complete) return -1;
      return 0;
    });

    setTasks(sortedTasks);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">My To-Do List</h1>
      <hr className="app-underline" />
      <AddTask addTask={addTask} />
      <DisplayTasks
        tasks={tasks}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
        toggleImportant={toggleImportant}
        setTasks={setTasks}
        setEditingTask={(task) => {
          setEditingTask({ text: task.text, id: task.id });
        }}
        editingTask={editingTask}
      />
    </div>
  );
};

export default App;
