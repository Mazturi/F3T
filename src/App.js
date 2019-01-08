import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './components/MainNavbar';
import './App.css';
import MainNavbar from './components/MainNavbar';
import SecondaryNavbar from './components/SecondaryNavbar';

class App extends Component {
  render() {
    return (
        <div>
          <MainNavbar/>
          <SecondaryNavbar/>
        </div>
    );
  }
}

export default App;
