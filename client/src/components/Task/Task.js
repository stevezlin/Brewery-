import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

import './Task.css';
class Task extends Component {
  render() {
    return (
      <div className="Task">
       {/* <div className="Task-points">{this.props.points}</div> */}
        <h1>{this.props.name}</h1>
        <p>Street: {this.props.street}</p> 
        <p>Phone: {this.props.phone}</p>
        <p>City: {this.props.city}</p>


        <br />
        <p>
          <button onClick={this.props.onMoveBackward}>&larr;</button>
         {/* <a onClick={this.props.onDelete}>Delete</a>*/}
          <button onClick={this.props.onMoveForward}>&rarr;</button>
        </p>
      </div>
    );
  }
}

export default Task;
