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
          <ul>
            <li>
              <Link to="/users">Usuarios</Link>
            </li>
            <li>
              <Link to="/drivers">Taxistas</Link>
            </li>
            <li>
              <Link to="/organizations">Sitios</Link>
            </li>
            <li>
              <Link to="/services">Tipos de servicio</Link>
            </li>
            <li>
              <Link to="/trips">Servicios activos</Link>
            </li>
          </ul>
        </section>
      </div>
    )
  }
}

export default Home;

