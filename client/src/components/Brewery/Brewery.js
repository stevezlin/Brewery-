import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

import './Brewery.css';
class Brewery extends Component {
  render() {
    return (
      <div className="Brewery">
      
        <h1>{this.props.name}</h1>
        <p>Street: {this.props.street}</p> 
        <p>Phone: {this.props.phone}</p>
        <p>City: {this.props.city}</p>


        <br />
        <p>
          <button onClick={this.props.onMoveBackward}>&larr;</button>
          <button  onClick={this.props.onSave}>Save </button>
          <button  onClick={this.props.onDelete}>Delete </button>

          <button onClick={this.props.onMoveForward}>&rarr;</button>
        </p>
      </div>
    );
  }
}

export default Brewery;
