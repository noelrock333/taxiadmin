import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/Home';
import NavigationBar from './sharedComponents/Navbar';
import UsersList from './components/UsersList';
import UserProfile from './components/UserProfile';
import UserEdit from './components/UserEdit';
import DriversList from './components/DriversList';

class App extends Component {
  render() {
    return (
      <div>
        <NavigationBar/>
        <div className="container">
          <Router>
            <div>
              <Route exact path="/" component={Home}/>
              <Route path="/users" component={UsersList}/>
              <Route exact path="/user/:id" component={UserProfile} />
              <Route path="/user/:id/edit" component={UserEdit} />
              <Route path="/drivers" component={DriversList}/>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
