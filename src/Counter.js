/**
 * <!--#####################################################################-->
 * <!--Author: Hamza Tariq-->
 * <!--Date: April 17, 2025-->
 * <!--Purpose: CIS-2286 2025 Assignment 6 - Counter.js-->
 * <!--Dependencies: React, useState-->
 */
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p className="counter-display">Count: {count}</p>
      <div className="counter-buttons">
        <button
          onClick={() => setCount(count + 1)}
          className="counter-button increment-button"
        >
          Increment
        </button>
        <button
          onClick={() => setCount(Math.max(0, count - 1))}
          className="counter-button decrement-button"
        >
          Decrement
        </button>
      </div>
    </div>
  );
}