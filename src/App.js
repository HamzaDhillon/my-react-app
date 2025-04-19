/**
 * <!--#####################################################################-->
 * <!--Author: Hamza Tariq-->
 * <!--Date: April 17, 2025-->
 * <!--Purpose: CIS-2286 2025 Assignment 6 - App.js-->
 * <!--Dependencies: React, Welcome, TodoList, UserList, Counter, ThemeContext, ThemeToggle-->
 */
import { Welcome } from "./Welcome";
import { TodoList } from "./TodoList";
import { UserList } from "./UserList";
import { Counter } from "./Counter";
import "./index.css"; // Import the CSS file
import { ThemeProvider } from './ThemeContext';
import { ThemeToggle } from "./ThemeToggle";

export default function App() {
  return (
    <ThemeProvider>
     <div>
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <h1 className="app-title">Todo App</h1>
          <Welcome name="Hamza" />
          <ThemeToggle />
        </div>
      </header>
      
      {/* Main Content */}
      <main className="main-content">
        {/* Main column */}
        <div>
          <TodoList />
        </div>
        
        {/* Sidebar */}
        <div className="sidebar">
          {/* Counter Widget */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Counter</h2>
            </div>
            <div className="card-body">
              <Counter />
            </div>
          </div>
          
          {/* User List Widget */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Users</h2>
            </div>
            <div className="card-body">
              <UserList />
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>Todo App © 2025</p>
        </div>
      </footer>
    </div>
    </ThemeProvider>
  );
}