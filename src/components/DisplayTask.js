import React from 'react';
import { MdDelete } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';

import './styles.css';

const DisplayTasks = ({
  tasks,
  deleteTask,
  toggleComplete,
  toggleImportant,
  setTasks,
  setEditingTask,
  editingTask,
}) => {
  const [editedText, setEditedText] = React.useState('');
  const handleEdit = (id) => {
    const updatedTasks = tasks.map((t) => (
      t.id === id ? { ...t, text: editedText } : t
    ));

    setTasks(updatedTasks);
    setEditingTask({ id: '', text: '' });
  };

  const handleEditStart = (taskId, text) => {
    setEditedText(text);
    setEditingTask({ id: taskId, text });
  };

  return (
    <ul className="tasks-list">
      {tasks.map((task) => (
        <li key={task.id}>
          {task.id === editingTask.id ? (
            <div>
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                aria-labelledby="taskInput"
              />
              <button type="button" onClick={() => handleEdit(task.id)}>
                Save
              </button>
            </div>
          ) : (
            <div className="task-item">
              <input
                type="checkbox"
                checked={task.complete}
                onChange={() => !task.isEditing && toggleComplete(task.id)}
                aria-label={`Complete task "${task.text}"`}
              />
              <span
                style={{
                  textDecoration: task.complete ? 'line-through' : 'none',
                  fontWeight: task.important ? 'bold' : 'normal',
                  cursor: 'pointer',
                }}
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
                {task.text}
              </span>
              <FaStar
                onClick={() => toggleImportant(task.id)}
                style={{
                  color: task.important ? 'gold' : 'black',
                  cursor: 'pointer',
                }}
              />
              <div>
                <button type="button" onClick={() => handleEditStart(task.id, task.text)}>
                  Edit
                  <CiEdit />
                </button>
                <button type="button" onClick={() => deleteTask(task.id)}>
                  {' '}
                  <MdDelete />
                </button>
              </div>
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
  setEditingTask: PropTypes.func.isRequired,
  editingTask: PropTypes.string.isRequired,
};

export default DisplayTasks;
