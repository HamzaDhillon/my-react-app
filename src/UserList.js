/**
 * <!--#####################################################################-->
 * <!--Author: Hamza Tariq-->
 * <!--Date: April 17, 2025-->
 * <!--Purpose: CIS-2286 2025 Assignment 6 - UserList.js-->
 * <!--Dependencies: React, useEffect, useState-->
 */
import { useEffect, useState } from "react";

export function UserList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        // Take first 5 users
        setUsers(data.slice(0, 5));
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      {users.length === 0 ? (
        <p className="empty-message">No users found</p>
      ) : (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id} className="user-item">
              <p className="user-name">{user.name}</p>
              <p className="user-email">{user.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}