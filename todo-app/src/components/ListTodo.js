import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ListTodo({
  todos,
  editingTodoIndex,
  onEditTodo,
  onSaveEditedTodo,
  onDeleteTodo,
  onClickCheckMark,
  isCompletedList
}) {
  const initialEditingText =
    editingTodoIndex >= 0 ? todos[editingTodoIndex] : '';
  const [editingText, onEditText] = useState(initialEditingText);
  return todos.map((todo, i) => {
    if (editingTodoIndex === i) {
      return (
        <div className="list-section-item" key={`todo-item-${i}`}>
          <div className="check-box-text-container">
            <input
              type="checkbox"
              onChange={onClickCheckMark.bind(this, i)}
              checked={isCompletedList ? 'checked' : ''}
            />
            <input
              type="text"
              className="form-control edit-todo-text-box"
              value={editingText || initialEditingText}
              onChange={evt => onEditText(evt.target.value)}
            />
          </div>
          <div className="buttons-container">
            <button
              type="button"
              className="btn btn-link"
              onClick={onSaveEditedTodo.bind(
                this,
                i,
                editingText,
                isCompletedList
              )}
              disabled={!editingText}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-link"
              onClick={onDeleteTodo.bind(this, i, isCompletedList)}
            >
              Delete
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="list-section-item" key={`todo-item-${i}`}>
        <div className="check-box-text-container">
          <input
            type="checkbox"
            onChange={onClickCheckMark.bind(this, i)}
            checked={isCompletedList ? 'checked' : ''}
          />
          <p className={`todo-list-text ${isCompletedList ? 'completed' : ''}`}>
            {todo}
          </p>
        </div>
        <div className="buttons-container">
          <button
            type="button"
            className="btn btn-link"
            onClick={onEditTodo.bind(this, i)}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-link"
            onClick={onDeleteTodo.bind(this, i, isCompletedList)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });
}

ListTodo.propTypes = {
  todos: PropTypes.array.isRequired,
  editingTodoIndex: PropTypes.number.isRequired,
  onEditTodo: PropTypes.func.isRequired,
  onSaveEditedTodo: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onClickCheckMark: PropTypes.func.isRequired,
  isCompletedList: PropTypes.bool.isRequired
};

export default ListTodo;
