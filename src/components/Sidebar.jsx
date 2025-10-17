import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink 
          to="/" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          end
        >
          Dashboard
        </NavLink>
        <NavLink 
          to="/analytics" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          Analytics
        </NavLink>
        <NavLink 
          to="/performance" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          Performance
        </NavLink>
        <NavLink 
          to="/settings" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          Settings
        </NavLink>
        <NavLink 
          to="/mind-game" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          Mind Game
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
