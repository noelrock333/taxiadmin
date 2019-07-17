import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';

class Home extends Component {
  render(){
    return(
      <div className="mt-4 row justify-content-center flex-column align-items-center">
        <ListGroup style={{marginTop: '15px'}} className="col-10 col-sm-10 col-md-8 col-lg-6 mt-6">
          <ListGroupItem tag="a" href="/users">Usuarios</ListGroupItem>
          <ListGroupItem tag="a" href="/drivers">Taxistas</ListGroupItem>
          <ListGroupItem tag="a" href="/organizations">Sitios</ListGroupItem>
          <ListGroupItem tag="a" href="/services">Tipos de Servicio</ListGroupItem>
          <ListGroupItem tag="a" href="/trips">Servicios activos</ListGroupItem>
        </ListGroup>
      </div>
    )
  }
}

export default Home;

