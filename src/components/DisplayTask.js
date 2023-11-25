import React from 'react';

const DisplayTasks = ({ tasks, toggleImportant, deleteTask, toggleComplete }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <span
            style={{
              textDecoration: task.complete ? 'line-through' : 'none',
              fontWeight: task.important ? 'bold' : 'normal',
            }}
            onClick={() => toggleComplete(task.id)}
          >
            {task.text}
          </span>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
          <input
            type="checkbox"
            checked={task.complete}
            onChange={() => toggleComplete(task.id)}
          />
        </li>
      ))}
    </ul>
  );
};

export default DisplayTasks;
