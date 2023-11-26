import React, { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import PropTypes from 'prop-types';

const AddTask = ({ addTask, categories }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      addTask(inputValue, selectedCategory);
      setInputValue('');
    }
  };

  return (
    <div>
      <h1>
        <IoMdAdd />
        {' '}
        New Task
      </h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add a new task..."
      />
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button type="button" onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

AddTask.propTypes = {
  addTask: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AddTask;
