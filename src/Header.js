import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from './BMW-logo-small.png';
import './App.css';

const Header = () => (
  <header>
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>User Management System</h2>
    </div>
    <ul className="main-nav">
      <li className="col-md-6"><NavLink to="/application">Applications</NavLink></li>
      <li className="col-md-6"><NavLink to="/users">User Accounts</NavLink></li>
    </ul>
  </header>
);

export default Header;
