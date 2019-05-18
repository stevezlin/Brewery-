import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

import './Task.css';
class Task extends Component {
  render() {
    return (
      <div className="Task">
       {/* <div className="Task-points">{this.props.points}</div> */}
        <h1>{this.props.name}</h1>
        <p>{this.props.name}</p>
        {/* <p><strong>Phase</strong> {this.props.phase}</p> */}
        {/* <p><strong>Points</strong> {this.props.points}</p> */}
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
