import React, { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
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
    <div>
      <div className="add-task-header">
        <IoMdAdd className="plus-icon" />
        <h1>New Task</h1>
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add a new task..."
      />
      <button type="button" onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

AddTask.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default AddTask;
