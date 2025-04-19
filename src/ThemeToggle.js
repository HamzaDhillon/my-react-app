/**
 * <!--#####################################################################-->
 * <!--Author: Hamza Tariq-->
 * <!--Date: April 17, 2025-->
 * <!--Purpose: CIS-2286 2025 Assignment 6 - ThemeToggle.js-->
 * <!--Dependencies: React, useTheme-->
 */
import { useTheme } from "./ThemeContext";

export function ThemeToggle() {
    const { isDarkMode, toggleTheme } = useTheme();  // Fixed the property name here

    return (
        <button onClick={toggleTheme} className="theme-toggle">
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
    );
}