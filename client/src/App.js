import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom'

import './App.css';

import Dashboard from './components/pages/Dashboard/Dashboard.js';
// import Search from './components/pages/Search/Search.js';
import EditTask from './components/pages/EditTask/EditTask.js';

import logo from './brello.png';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-navigation">
          <img src={logo} alt="brello" />
          <p>Manage your project with Brello - the Abraisive Project Manager!</p>
          <Link to="/">Manage</Link>
          {/* <Link to="/add">Search</Link> */}
          
        </div>

        <div className="App-mainContent">

          <Switch>
            <Route exact path='/' component={Dashboard} />
            {/* <Route exact path='/add' component={Search} /> */}
            <Route exact path='/edit/:id/' component={EditTask} />
          </Switch>

        </div>

      </div>
    );
  }
}

export default App;
