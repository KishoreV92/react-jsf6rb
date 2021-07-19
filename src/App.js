import React, { Component } from 'react';
import './style.css';
import axios from 'axios';
import Loading from './Loading';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getUsers() {
    this.setState({ loading: true });
    axios('https://api.randomuser.me/?NAT=US&results=5').then(response =>
      this.setState({ users: response.data.results, loading: false })
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getUsers();
  }

  componentWillMount() {
    this.getUsers();
  }
  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input type="submit" style={{ color: 'red' }} value="load more" />
        </form>
        {!this.state.loading ? (
          this.state.users.map(user => (
            <div>
              <h3>{user.name.first}</h3>
              <p>{user.email}</p>
              <hr />
            </div>
          ))
        ) : (
          <Loading message="Waiting" />
        )}
      </div>
    );
  }
}

export default App;
