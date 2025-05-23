import React, { useState, useEffect } from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import '../styles.css';

const TodoApp = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (task) => {
    if (task.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        task,
        completed: false
      }]);
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    ));
  };

  const editTodo = (id, newTask) => {
    setTodos(todos.map(todo =>
      todo.id === id ? {...todo, task: newTask} : todo
    ));
  };

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <TodoInput addTodo={addTodo} />
      <div className="todo-list">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleComplete={toggleComplete}
            editTodo={editTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoApp;