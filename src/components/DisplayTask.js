import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import PropTypes from 'prop-types';
import { FaRegStar } from 'react-icons/fa';

const DisplayTasks = ({
  tasks,
  deleteTask,
  toggleComplete,
  toggleImportant,
  setTasks,
}) => {
  const [editValues, setEditValues] = useState({});

  // const handleImportantClick = (taskId) => {
  //   const updatedTasks = tasks.map((task) => (
  //     task.id === taskId ? { ...task, important: !task.important } : task
  //   ));
  //   const sortedTasks = updatedTasks.sort((a, b) => {
  //     if (a.important && !b.important) return -1;
  //     if (!a.important && b.important) return 1;
  //     return 0;
  //   });

  //   setTasks(sortedTasks);
  // };

  const handleEdit = (taskId, text) => {
    const updatedEditValues = { ...editValues, [taskId]: text };
    setEditValues(updatedEditValues);

    const updatedTasks = tasks.map((task) => (
      task.id === taskId ? { ...task, isEditing: true } : { ...task, isEditing: false }
    ));
    setTasks(updatedTasks);
  };

  const handleInputChange = (e) => {
    setEditValues(e.target.value);
  };

  const handleEditStart = (taskId, text) => {
    setEditValues(text);
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.id === editValues ? (
            <div>
              <input
                type="text"
                value={editValues}
                onChange={handleInputChange}
                aria-labelledby="taskInput"
              />
              <button type="button" onClick={() => handleEdit(task.id, editValues)}>
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
                onClick={() => !task.isEditing && toggleComplete(task.id)}
                onKeyDown={(e) => {
                  if (!task.isEditing && e.key === 'Enter') {
                    toggleComplete(task.id);
                  }
                }}
                role="checkbox"
                aria-checked={task.complete}
                tabIndex={0}
                aria-label={`Task: ${task.text}`}
              >
                <FaRegStar
                  onClick={() => toggleImportant(task.id)}
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
                {' '}
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
      complete: PropTypes.bool,
      important: PropTypes.bool,
    }),
  ).isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  toggleImportant: PropTypes.func.isRequired,
  setTasks: PropTypes.func.isRequired,
};

export default DisplayTasks;
