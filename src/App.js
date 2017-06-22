import React, { Component } from 'react';

import {
  BrowserRouter,
  Route
} from 'react-router-dom';

import './App.css';
import Header from './Header';
import Application from './Application';
import Users from './Users';

// var $ = require('jquery');

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route exact path="/" component={Application}/>
          <Route path="/application" component={Application}/>
          <Route path="/users" component={Users}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
