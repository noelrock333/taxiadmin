import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { init, instance } from './firebase'
import Home from './components/Home';
import NavigationBar from './sharedComponents/Navbar';
import UsersList from './components/UsersList';
import UserProfile from './components/UserProfile';
import UserEdit from './components/UserEdit';
import DriversList from './components/DriversList';
import DriverEdit from './components/DriverEdit';
import OrganizationsList from './components/OrganizationsList';
import OrganizationEdit from './components/OrganizationEdit';
import ServicesList from './components/ServicesList';
import TripsList from './components/TripsList';

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
              <Route path="/driver/:id/edit" component={DriverEdit} />
              <Route path="/organizations" component={OrganizationsList}/>
              <Route path="/organization/:id/edit" component={OrganizationEdit} />
              <Route path="/services" component={ServicesList}/>
              <Route path="/trips" component={TripsList}/>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
