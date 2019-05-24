import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom'

import './App.css';

import Dashboard from './components/pages/Dashboard/Dashboard.js';
import logo from './brewjob.png';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-navigation">
          <img src={logo} alt="bewjob" className="App-logo"/>
          <p className="header-text">BrewJob - the Brewery Finding App!</p>
          <Link to="/">Home</Link>
          {/* <Link to="/add">Search</Link> */}
          
        </div>

        <div className="App-mainContent">

          <Switch>
            <Route exact path='/' component={Dashboard} />
      
          </Switch>

        </div>

      </div>
    );
  }
}

export default App;
