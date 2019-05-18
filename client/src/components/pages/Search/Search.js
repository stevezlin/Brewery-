import React, { Component } from 'react';
import './Search.css';

class Search extends Component {


 state = {
    city: '',
    // points: '',
    // text: '',
    // phase: '',
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

        if (!data.main) {
            this.setState({
              city: "Not found.",
            });
            return;
        }

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


  render() {

    return (
      <div className="Search">
        <h1>Search Brewery</h1>

        <p>
          <label>City
            <input
              onChange={this.onChangeCity}
              value={this.state.city} />
          </label>
        </p>

        {/* <p>
          <label>Points
            <input
              type="number"
              onChange={this.onChangePoints}
              value={this.state.points} />
          </label>
        </p> */}

        {/* <p>
          <label>Text
            <textarea
              onChange={this.onChangeText}
              value={this.state.text} />
          </label>
        </p> */}

        {this.state.error ? <p>{this.state.error}</p> : null}

        <button onClick={this.submit, this.onRefresh}>Search</button>
      </div>
    );
  }
}

export default Search;



