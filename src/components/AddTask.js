import React, { useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import PropTypes from 'prop-types';

import './styles.css';

const AddTask = ({ addTask }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      addTask(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="add-task-container">
      <div className="add-task-header">
        <FiPlusCircle className="plus-icon" />
        <h1>New Task</h1>
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add a new task here..."
      />
      <button className="Add-btn" type="button" onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

AddTask.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default AddTask;
