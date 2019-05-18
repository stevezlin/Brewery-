import React, { Component } from 'react';
import './Dashboard.css';

import Task from '../../Task/Task.js';

class Dashboard extends Component {
  state = {
    tasks: [
    ],
    city: [],
    breweries: [],
  }

  onRefresh = () => {
    console.log('hitting refresh', this.state.searchBox);
    const query = this.state.city.replace(/ /g, '+');
    const url = 'https://api.openbrewerydb.org/breweries?by_city=' +
      query ;
    fetch(url)
      .then(response => response.json())
      .then(data => {
            console.log('receiving data', data);

            if (data.length === 0) {
                this.setState({
                  city: "Not found.",
                });
                return;
            }
        
            this.setState({
                breweries: data,
            });

            this.setState({
                city: data.name,

             });
        });
        
    }


  onChangeCity = (ev) => {
    this.setState({
      city: ev.target.value,
    });
  }

  onChangeText = (ev) => {
    this.setState({
      text: ev.target.value,
    });
  }

  onChangePoints = (ev) => {
    this.setState({
      points: ev.target.value,
    });
  }

  submit = () => {
    // Bonus Challenge #1: Check for empty title before submitting
    if (!this.state.city) {
      this.setState({
        error: 'Please enter City',
      });
      return;
    }

    // Challenge #3: Create new one
    const data = {
      points: this.state.points,
      text: this.state.text,
      city: this.state.city,
      phase: this.state.phase,
    };

    // fetch('/api/create/',
    //   {method: 'POST', body: JSON.stringify(data) })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('success!');

    //     // Clear state after
    //     this.setState({
         
    //       points: '',
    //       text: '',
    //       city: '',
    //       error: '',
    //     });
    //   });
  }
  onSearchBoxChange = (ev) => {
    this.setState({searchBox: ev.target.value});
  }

  componentDidMount() {
    fetch('/api/all')
      .then(response => response.json())
      .then(data => {
        console.log('got data back', data);
        this.setState({
            tasks: data.tasks,
        });
      });
  }


  moveTask(taskId, newPhase) {
    // Challenge #4: Implementing task movement on the backend using Fetch
    const data = {
      phase: newPhase,
    };

    fetch('/api/' + taskId + '/update/',
      {method: 'PUT', body: JSON.stringify(data) })
      .then(response => response.json())
      .then(data => {
        console.log('success!');

        // Call this method to refresh the page after
        this.componentDidMount();
      });
  }


  deleteTask(taskId) {
    // Challenge #5: Implementing delete feature
    fetch('/api/' + taskId + '/delete/', {method: 'DELETE'})
      .then(response => response.json())
      .then(data => {
        console.log('success!');

        // Call this method to refresh the page after
        this.componentDidMount();
      });
  }

  render() {
    //const breweryPhase0 = this.state.breweries.filter(brewery => brewery.phase === 0);
    //const breweryPhase1 = this.state.breweries.filter(brewery => brewery.phase === 1);
    const breweryPhase0 = this.state.breweries;


    return (
      <div className="Dashboard">
        <div>
        <div className="Search">
        <h1>Search Brewery</h1>

        <p>
          <label>City
            <input
              onChange={this.onChangeCity}
              value={this.state.city} />
          </label>
        </p>


        {this.state.error ? <p>{this.state.error}</p> : null}

        <button onClick={this.submit, this.onRefresh}>Search</button>
      </div>
        </div>
        <div className="Dashboard-column">
          <h1>Wanna do it</h1>
          {
            breweryPhase0.map(task => (
              <Task title={task.name} text={task.s} phase={task.phase} points={task.points} id={task.id}
                onDelete={() => this.deleteTask(task.id)}
                onMoveForward={() => this.moveTask(task.id, 1)}
              />
            ))
          }
        </div>
        <div className="Dashboard-column">
          <h1>Gettin it done</h1>
          { /*
            breweryPhase1.map(task => (
              <Task title={task.title} text={task.text} phase={task.phase} points={task.points} id={task.id}
                onDelete={() => this.deleteTask(task.id)}
                onMoveForward={() => this.moveTask(task.id, 2)}
                onMoveBackward={() => this.moveTask(task.id, 0)}
                />
            ))
          */ }
        </div>
       
       
      </div>
    );
  }
}

export default Dashboard;

