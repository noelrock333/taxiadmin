import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';

class Home extends Component {
  render(){
    return(
      <div>
        <ListGroup style={{marginTop: '15px'}}>
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

