import React, { Component } from 'react';
import './Dashboard.css';

import Task from '../../Task/Task.js';

class Dashboard extends Component {
  state = {
    name: [],
    brewery: [],
    phase:[],
  }

  onRefresh = () => {
    console.log('hitting refresh');
    const cityQuery = this.state.city;
    const stateQuery = this.state.state;
    const url = 'https://api.openbrewerydb.org/breweries?by_city='+   
    cityQuery  + '&by_state=' + stateQuery;
    fetch(url)
      .then(response => response.json())
      .then(data => {
            console.log('receiving data', data);

            if (data.length === 0) {
                this.setState({
                  city: "Not found.",
                  state: "Not found.",
                });
                return;
            }

            for (const brewery of data) {
              console.log(brewery);
              console.log('hey this is brewery');
              brewery.phase = 0;
            }
        
            this.setState({
                brewery: data,
            });


        });
        
    }


  onChangeCity = (ev) => {
    this.setState({
      city: ev.target.value,
    });
  }
  onChangeState = (ev) => {
    this.setState({
      state: ev.target.value,
    });
  }


//  onChangePoints = (ev) => {
//    this.setState({
//      points: ev.target.value,
//    });
//  }

//  submit = () => {
    // Bonus Challenge #1: Check for empty title before submitting
//    if (!this.state.city) {
//      this.setState({
//        error: 'Please enter City',
//      });
//      return;
//    }

    // Challenge #3: Create new one
//    const data = {
//      points: this.state.points,
//      text: this.state.text,
//      city: this.state.city,
//      phase: this.state.phase,
//    };

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
//  }
//  onSearchBoxChange = (ev) => {
//    this.setState({searchBox: ev.target.value});
//  }

  // componentDidMount() {
  //   fetch('/api/all')
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('got data back', data);
  //      this.setState({
  //           name: data.tasks,
      //  });
    //  });
//  }


  moveTaskForward(taskId, newPhase) {

            for (const brewery of this.state.brewery) {
              console.log(brewery);
              console.log('hey this is brewery');
            if (brewery.id === taskId ) {
                brewery.phase = 1;
              }
            }

            //   if (data.length === 0) {
            //     this.setState({
            //       city: "Not found.",
            //     });
            //     return;
            // }


            //   brewery.phase = 1;
            // }
        
            this.setState({
                brewery: this.state.brewery,
            });

  //  fetch('/api/' + taskId + '/update/',
  //    {method: 'PUT', body: JSON.stringify(data) })
  //    .then(response => response.json())
  //    .then(data => {
  //      console.log('success!');

        // Call this method to refresh the page after
        // this.componentDidMount();
      // });
  }

  moveTaskBackward(taskId, newPhase) {
    // Challenge #4: Implementing task movement on the backend using Fetch
    // const task = {
    //   phase: newPhase,
    // };

    console.log('hitting refresh');
    const query = this.state.city;
    const url = 'https://api.openbrewerydb.org/breweries?by_city=' +
      query ;
    fetch(url)
      .then(response => response.json())
      .then(data => {
            console.log('receiving data', data);

            for (const brewery of data) {
              console.log(brewery);
              console.log('hey this is brewery');
              brewery.phase = 0;
            }
        
            this.setState({
                brewery: data,
            });

  //  fetch('/api/' + taskId + '/update/',
  //    {method: 'PUT', body: JSON.stringify(data) })
  //    .then(response => response.json())
  //    .then(data => {
  //      console.log('success!');

        // Call this method to refresh the page after
  //       this.componentDidMount();
      });
  }


//  deleteTask(taskId) {
    // Challenge #5: Implementing delete feature
//    fetch('/api/' + taskId + '/delete/', {method: 'DELETE'})
//      .then(response => response.json())
//      .then(data => {
//        console.log('success!');

        // Call this method to refresh the page after
//        this.componentDidMount();
//      });
//  }

  render() {
   const breweryPhase0 = this.state.brewery.filter(brewery => brewery.phase === 0);
   const breweryPhase1 = this.state.brewery.filter(brewery => brewery.phase === 1);
  // const breweryPhase0 = this.state.breweries;


    return (
      <div className="Dashboard">
       
        <div className="Dashboard-column">
        <h1>① Search Brewery</h1>

        <p>
          <div className="search"><label> 
            City:   <input
              onChange={this.onChangeCity}
              value={this.state.city} /><br/>

             
        State: <input
              onChange={this.onChangeState}
              value={this.state.state} />
             </label></div>
        </p>


        {this.state.error ? <p>{this.state.error}</p> : null}
<br/>
<div align="center">
        <button className="button" onClick={this.onRefresh}>Search</button>
        </div> 
        </div>
        <div className="Dashboard-column">
          <h1>② Wanna Brew it?</h1>
          {
            breweryPhase0.map(brewery => (
              <Task id={brewery.id}
                name ={brewery.name}
                street ={brewery.street}
                phone ={brewery.phone}
                phase={brewery.phase}
                onMoveForward={() => this.moveTaskForward(brewery.id, 1)
                }
              />
            ))
          }
        </div>
        <div className="Dashboard-column">
          <h1>③ Let's Brew It!</h1>
          {
            breweryPhase1.map(brewery => (
              <Task id={brewery.id}
                name ={brewery.name}
                street ={brewery.street}
                phone ={brewery.phone}


                phase={brewery.phase}
                onMoveBackward={() => this.moveTaskBackward(brewery.id, 0)}
                />
            ))
          }
        </div>
       
       
      </div>
    );
  }
}

export default Dashboard;

