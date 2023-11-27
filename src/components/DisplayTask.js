import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import PropTypes from 'prop-types';
import { FaRegStar } from 'react-icons/fa';

const DisplayTasks = ({
  tasks,
  deleteTask,
  toggleComplete,
  editTask,
  selectedCategory,
  setTasks,
}) => {
  const [editValue, setEditValue] = useState('');

  const handleImportantClick = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, important: !task.important } : task
    );
    setTasks([
      updatedTasks.find((task) => task.id === taskId),
      ...updatedTasks.filter((task) => task.id !== taskId),
    ]);
  };

  const handleEdit = (taskId, text) => {
    editTask(taskId, text);
    setEditValue('');
  };

  const handleInputChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleEditStart = (taskId, text) => {
    setEditValue(text);
  };

  const filteredTasks = selectedCategory
    ? tasks.filter((task) => task.category === selectedCategory)
    : tasks;

  return (
    <ul>
      {filteredTasks.map((task) => (
        <li key={task.id}>
          {task.id === editValue ? (
            <div>
              <input
                type="text"
                value={editValue}
                onChange={handleInputChange}
              />
              <button type="button" onClick={() => handleEdit(task.id, editValue)}>
                Save
              </button>
            </div>
          ) : (
            <div>
              <span
                style={{
                  textDecoration: task.complete ? 'line-through' : 'none',
                  fontWeight: task.important ? 'bold' : 'normal',
                  cursor: 'pointer',
                }}
                onClick={() => toggleComplete(task.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    toggleComplete(task.id);
                  }
                }}
                role="checkbox"
                aria-checked={task.complete}
                tabIndex={0}
                aria-label={`Task: ${task.text}`}
              >
                <FaRegStar
                  onClick={() => handleImportantClick(task.id)}
                  style={{
                    color: task.important ? 'gold' : 'black',
                    cursor: 'pointer',
                  }}
                />
                {task.text}
              </span>
              <button type="button" onClick={() => handleEditStart(task.id, task.text)}>
                Edit
                <CiEdit />
              </button>
              <button type="button" onClick={() => deleteTask(task.id)}>
                <MdDelete />
              </button>
              <input
                type="checkbox"
                checked={task.complete}
                onChange={() => toggleComplete(task.id)}
                aria-label={`Complete task "${task.text}"`}
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

DisplayTasks.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      category: PropTypes.string,
      complete: PropTypes.bool,
      important: PropTypes.bool,
    })
  ).isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string,
  setTasks: PropTypes.func.isRequired,
};

export default DisplayTasks;
