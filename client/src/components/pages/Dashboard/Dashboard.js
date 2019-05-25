import React, { Component } from 'react';
import './Dashboard.css';

import Brewery from '../../Brewery/Brewery.js';

class Dashboard extends Component {
  state = {

    brewery: [],
    phase:[],
  }
 
  componentWillMount() {
    localStorage.getItem('brewery') && this.setState ({
      brewery: JSON.parse (localStorage.getItem('brewery')),
  
    })

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



  moveBreweryForward(breweryId, newPhase) {

            for (const brewery of this.state.brewery) {
              console.log(brewery);
              console.log('hey this is brewery');
            if (brewery.id === breweryId ) {
                brewery.phase = 1;
              }
            }

    
        
            this.setState({
                brewery: this.state.brewery,
            });
 }



  moveBreweryBackward(breweryId, newPhase) {
  

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
    });
  }

componentWillUpdate(nextProps, nextState) {
  localStorage.setItem('brewery', JSON.stringify(nextState.brewery));
  localStorage.setItem('breweryDate', Date.now());
}



  render() {
   const breweryPhase0 = this.state.brewery.filter(brewery => brewery.phase === 0);
   const breweryPhase1 = this.state.brewery.filter(brewery => brewery.phase === 1);
 


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
              <Brewery id={brewery.id}
                name ={brewery.name}
                street ={brewery.street}
                city ={brewery.city}
                phone ={brewery.phone}
                phase={brewery.phase}
                onMoveForward={() => this.moveBreweryForward(brewery.id, 1)
                }
              />
            ))
          }
        </div>



        <div className="Dashboard-column">
          <h1>③ Let's Brew It!</h1>
          {
            breweryPhase1.map(brewery => (
              <Brewery id={brewery.id}
                name ={brewery.name}
                street ={brewery.street}
                phone ={brewery.phone}


                phase={brewery.phase}
                onMoveBackward={() => this.moveBreweryBackward(brewery.id, 0)}
                />
            ))
          }
        </div>
       
       
      </div>
    );
  }
}

export default Dashboard;

