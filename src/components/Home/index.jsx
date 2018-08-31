import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render(){
    return(
      <div>
        <header>
          <h2>Cytio admin</h2>
        </header>
        <section>
          <Link to="/users">Users</Link>
        </section>
      </div>
    )
  }
}

export default Home;

