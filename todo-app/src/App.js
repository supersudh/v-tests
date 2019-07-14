import React from 'react';
import './App.css';
import ListTodo from './components/ListTodo';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      completedTodos: [],
      addTodoText: '',
      isAddTodoTextValid: true,
      editingTodoIndex: -1,
      completedEditingTodoIndex: -1,
      helpText: '(Press Enter to Add the todo)'
    };

    setTimeout(() => {
      this.setState({ helpText: '' });
    }, 5000);
  }

  onChangeAddTodoText = evt => {
    this.setState({
      addTodoText: evt.target.value
    });
  };

  onAddTodo = () => {
    const { addTodoText } = this.state;
    if (!addTodoText) {
      this.toggleAddTodoTextValidity();
      setTimeout(() => {
        this.toggleAddTodoTextValidity();
      }, 1000);
    } else {
      const { todos } = this.state;
      this.setState({
        todos: todos.concat(addTodoText),
        addTodoText: ''
      });
    }
  };

  onEditTodo = idx => this.setState({ editingTodoIndex: idx });
  onEditCompletedTodo = idx =>
    this.setState({ completedEditingTodoIndex: idx });

  onSaveEditedTodo = (idx, todoText, isCompletedTodo = false) => {
    const { todos, completedTodos } = this.state;
    let newTodos = [];
    if (isCompletedTodo) {
      newTodos = [
        ...completedTodos.slice(0, idx),
        todoText,
        ...completedTodos.slice(idx + 1)
      ];
      this.setState({
        completedTodos: newTodos,
        completedEditingTodoIndex: -1
      });
    } else {
      newTodos = [...todos.slice(0, idx), todoText, ...todos.slice(idx + 1)];
      this.setState({
        todos: newTodos,
        editingTodoIndex: -1
      });
    }
  };

  onDeleteTodo = (idx, isCompletedTodo = false) => {
    if (isCompletedTodo) {
      this.setState({
        completedTodos: this.state.completedTodos.filter((todo, i) => i !== idx)
      });
    } else {
      this.setState({ todos: this.state.todos.filter((todo, i) => i !== idx) });
    }
  };

  onCompleteTodo = idx => {
    const { todos, completedTodos } = this.state;
    const targetTodo = todos.find((todo, i) => i === idx);
    this.setState({
      todos: todos.filter((todo, i) => i !== idx),
      completedTodos: completedTodos.concat(targetTodo)
    });
  };

  onBackLogTodo = idx => {
    const { todos, completedTodos } = this.state;
    const targetTodo = completedTodos.find((todo, i) => i === idx);
    this.setState({
      completedTodos: completedTodos.filter((todo, i) => i !== idx),
      todos: todos.concat(targetTodo)
    });
  };

  toggleAddTodoTextValidity = () =>
    this.setState(({ isAddTodoTextValid }) => ({
      isAddTodoTextValid: !isAddTodoTextValid
    }));

  render() {
    const { todos, completedTodos, isAddTodoTextValid } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6">
            <div className="add-root">
              <div className="list-header-container">
                <p className="list-title">
                  ADD ITEM {this.state.helpText || ''}
                </p>
                <div className="add-section">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={
                        isAddTodoTextValid ? '' : 'Cannot add Empty TODO!'
                      }
                      onChange={this.onChangeAddTodoText}
                      value={this.state.addTodoText}
                      onKeyPress={evt => {
                        if (evt.charCode === 13) {
                          this.onAddTodo();
                        }
                      }}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={this.onAddTodo}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="list-root">
              <div className="list-header-container">
                <p className="list-title">TODO ({todos.length})</p>
                <div className="list-section">
                  <ListTodo
                    todos={todos}
                    editingTodoIndex={this.state.editingTodoIndex}
                    onEditTodo={this.onEditTodo}
                    onSaveEditedTodo={this.onSaveEditedTodo}
                    onDeleteTodo={this.onDeleteTodo}
                    onClickCheckMark={this.onCompleteTodo}
                    isCompletedList={false}
                  />
                </div>
              </div>
            </div>
            <div className="completed-root">
              <div className="list-header-container">
                <p className="list-title">
                  COMPLETED ({completedTodos.length})
                </p>
                <div className="list-section">
                  <ListTodo
                    todos={completedTodos}
                    editingTodoIndex={this.state.completedEditingTodoIndex}
                    onEditTodo={this.onEditCompletedTodo}
                    onSaveEditedTodo={this.onSaveEditedTodo}
                    onDeleteTodo={this.onDeleteTodo}
                    onClickCheckMark={this.onBackLogTodo}
                    isCompletedList
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
