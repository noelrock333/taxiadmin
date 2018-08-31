import React, {Component} from 'react';
import Api from '../../utils/api';
import Alert from '../../sharedComponents/AlertMessage';
import UserForm from '../UserForm';
import {
  withRouter
} from 'react-router-dom'

class UserEdit extends Component {
  state = {
    user: null,
    errors: null
  }

  componentDidMount(){
    const user_id = this.props.match.params.id;
    Api.get(`/user/${user_id}`)
      .then(({data}) => {
        this.setState({
          user: data,
        })
      }).catch((err) => {
        this.setState({
          errors: [...err.response.data.errors]
        })
      })
  }

  handleSubmit = ({id, email, full_name}) => {
    Api.put(`/user/${id}`, {email, full_name})
      .then(({data}) => {
        this.props.history.push({
          pathname: '/users',
          flash: {type: "success", message: 'Usuario actualizado con exito'}
        });
      }).catch((err) => {
        this.setState({
          errors: err.response.data.errors
        })
      })
  }

  render() {
    const {user, errors} = this.state;
    return (
      <div>
        { errors && <Alert message={errors[0]}/>}
        { user && <UserForm user={user} onSubmit={this.handleSubmit}/>}
      </div>
    )
  }
}

export default withRouter(UserEdit)
