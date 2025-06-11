import React from 'react';
import './NavBar.css'; // We'll write custom styles here

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Task Manager</div>
      <ul className="navbar-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Tasks</a></li>
        <li><a href="#">Profile</a></li>
      </ul>
    </nav>
  );
}

export default NavBar;
