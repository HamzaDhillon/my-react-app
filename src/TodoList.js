/**
 * <!--#####################################################################-->
 * <!--Author: Hamza Tariq-->
 * <!--Date: April 17, 2025-->
 * <!--Purpose: CIS-2286 2025 Assignment 6 - TodoList.js-->
 * <!--Dependencies: React, useState, useEffect-->
 */
import { useState, useEffect } from "react";

export function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [priority, setPriority] = useState("medium");
  const [filter, setFilter] = useState("all"); // "all", "active", "completed"
  const [isLoading, setIsLoading] = useState(false);

  // Load todos from localStorage on initial render
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos && JSON.parse(savedTodos).length > 0) {
      setTodos(JSON.parse(savedTodos));
    } else {
      // Show loading state for demo effect
      setIsLoading(true);
      setTimeout(() => {
        // Default sample todos with priority property
        setTodos([
          { id: 1, text: "Learn React Fundamentals", completed: true, priority: "high", createdAt: new Date().toISOString() },
          { id: 2, text: "Build a Todo App", completed: false, priority: "medium", createdAt: new Date().toISOString() },
          { id: 3, text: "Style with CSS", completed: false, priority: "low", createdAt: new Date().toISOString() }
        ]);
        setIsLoading(false);
      }, 600);
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (!isLoading && todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newTodo.trim() === "") return;

    const todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      createdAt: new Date().toISOString(),
      priority
    };

    setTodos([...todos, todo]);
    setNewTodo("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // "all" filter
  });

  const pendingCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.length - pendingCount;

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Tasks</h2>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit} className="todo-form">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="todo-input"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="priority-select"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button type="submit" className="add-button">
            Add
          </button>
        </form>

        {/* Filters */}
        <div className="filters">
          {["all", "active", "completed"].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`filter-button ${filter === filterType ? 'active' : ''}`}
            >
              {filterType}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : filteredTodos.length === 0 ? (
          <div className="empty-message">
            {filter === "all"
              ? "Your task list is empty. Add a task to get started!"
              : filter === "active"
                ? "No active tasks remaining!"
                : "No completed tasks yet!"}
          </div>
        ) : (
          <ul className="todo-list">
            {filteredTodos.map(todo => (
              <li key={todo.id} className="todo-item">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="todo-checkbox"
                />
                <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                  <span className={`priority-${todo.priority}`}>
                    {todo.text} <small className="priority-label">({todo.priority})</small>
                  </span>
                </span>
                <button
                  onClick={() => removeTodo(todo.id)}
                  className="delete-button"
                  aria-label="Delete todo"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"></path>
                    <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}

        {todos.length > 0 && !isLoading && (
          <div className="todo-footer">
            <div>
              {pendingCount} {pendingCount === 1 ? "task" : "tasks"} remaining
            </div>

            {completedCount > 0 && (
              <button
                onClick={clearCompleted}
                className="clear-button"
              >
                Clear completed
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
