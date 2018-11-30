import React, { Component } from 'react';
import { withRouter, Switch, Route, NavLink } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

const url = process.env.REACT_APP_API_URL;

class App extends Component {
  render() {
    return (
      <div className="App">
      <Switch>
      
        <Route path="/signin" Component={() => (<div></div>)} />
        <Route path="/signup" Component={() => (<div></div>)} />
        <Route path="/" render={() => {
          return (
            <React.Fragment>
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
            
            </React.Fragment>
          )
        }} />
      </Switch>

      </div>
    );
  }
}

export default withRouter(App);
