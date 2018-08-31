import React, {Component} from 'react';
import Api from '../../utils/api';
import { Row, Col } from 'reactstrap';
import AlertMessage from '../../sharedComponents/AlertMessage';

export default class UserProfile extends Component {
  state = {
    user: null,
    errors: null
  }

  componentDidMount(){
    const user_id = this.props.match.params.id;
    Api.get(`/user/${user_id}`)
      .then(({data}) => {
        this.setState({
          user: data
        })
      }).catch((err) => {
        this.setState({
          errors: err.response.data.errors
        })
      })
  }

  render(){
    const {user, errors} = this.state;
    return(
      <div>
        <Row>
        <Col>
          {
            errors && <AlertMessage message={errors[0]}/>
          }
          {
            user &&
              <React.Fragment>
                <h2>Nombre: {user.full_name}</h2>
                <p>Id: {user.id}</p>
                <p>Email: {user.email}</p>
              </React.Fragment>
          }
          </Col>
        </Row>
      </div>
    )
  }
}
