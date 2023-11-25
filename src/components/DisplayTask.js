import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const DisplayTasks = ({
  tasks,
  toggleImportant,
  deleteTask,
  toggleComplete,
  editTask,
  selectedCategory,
}) => {
  const [editValue, setEditValue] = useState('');
  const filteredTasks = selectedCategory
    ? tasks.filter((task) => task.category === selectedCategory)
    : tasks;

  const handleEdit = (task) => {
    setEditValue(task.text);
    editTask(task.id, editValue);
    setEditValue('');
  };

  return (
    <ul>
      {filteredTasks.map((task) => (
        <li key={task.id}>
          {task.id === editValue ? (
            <div>
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
              <button onClick={() => handleEdit(task)}>Save</button>
            </div>
          ) : (
            <div>
              <span
                style={{
                  textDecoration: task.complete ? 'line-through' : 'none',
                  fontWeight: task.important ? 'bold' : 'normal',
                }}
                onClick={() => toggleComplete(task.id)}
              >
                {task.text}
              </span>
              <button onClick={() => deleteTask(task.id)}><MdDelete /></button>
              <button onClick={() => toggleImportant(task.id)}>
                {task.important ? 'Unimportant' : 'Important'}
              </button>
              <button onClick={() => setEditValue(task.id)}>Edit<CiEdit /></button>
              <input
                type="checkbox"
                checked={task.complete}
                onChange={() => toggleComplete(task.id)}
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default DisplayTasks;
