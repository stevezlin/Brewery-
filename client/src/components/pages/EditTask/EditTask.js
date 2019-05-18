import React, { Component } from 'react';
import './EditTask.css';
class EditTask extends Component {
  state = {
    title: '',
    points: 5,
    text: '',
  }

  componentDidMount = () => {
    // Bonus Challenge #2: Do update
    fetch('/api/' + this.props.match.params.id)
      .then(response => response.json())
      .then(data => {
        console.log('success!', data);

        // Set data from the response
        this.setState(data.task);
      });
  }

  onChangeTitle = (ev) => {
    this.setState({
      title: ev.target.value,
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
    if (!this.state.title) {
      this.setState({
        error: 'Needs title',
      });
      return;
    }

    const data = {
      points: this.state.points,
      text: this.state.text,
      title: this.state.title,
    };

    fetch('/api/' + this.state.id + '/update/',
      {method: 'PUT', body: JSON.stringify(data) })
      .then(response => response.json())
      .then(data => {
        console.log('success!');

        // Clear error after
        this.setState({
          error: '',
        });
      });
  }

  render() {
    return (
      <div className="EditTask">
        <h1>Edit Task</h1>

        <p>
          <label>Title
            <input
              onChange={this.onChangeTitle}
              value={this.state.title} />
          </label>
        </p>

        <p>
          <label>Points
            <input
              type="number"
              onChange={this.onChangePoints}
              value={this.state.points} />
          </label>
        </p>

        <p>
          <label>Text
            <textarea
              onChange={this.onChangeText}
              value={this.state.text} />
          </label>
        </p>

        {this.state.error ? <p>{this.state.error}</p> : null}

        <button onClick={this.submit}>Update</button>
      </div>
    );
  }
}

export default EditTask;
