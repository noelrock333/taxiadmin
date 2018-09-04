import React, {Component} from 'react';
import Api from '../../utils/api';
import Alert from '../../sharedComponents/AlertMessage';
import OrganizationForm from '../OrganizationForm';
import {
  withRouter
} from 'react-router-dom'

class OrganizationEdit extends Component {
  state = {
    organization: null,
    errors: null
  }

  componentDidMount(){
    const org_id = this.props.match.params.id;
    Api.get(`/organization/${org_id}`)
      .then(({data}) => {
        this.setState({
          organization: data,
        })
      }).catch((err) => {
        this.setState({
          errors: [...err.response.data.errors]
        })
      })
  }

  handleSubmit = ({id, name}) => {
    Api.put(`/organization/${id}`, {name})
      .then(({data}) => {
        this.props.history.push({
          pathname: '/organizations',
          flash: {type: "success", message: 'Sitio actualizado con exito'}
        });
      }).catch((err) => {
        this.setState({
          errors: err.response.data.errors
        })
      })
  }

  render() {
    const {organization, errors} = this.state;
    return (
      <div>
        { errors && <Alert message={errors[0]}/>}
        { organization && <OrganizationForm organization={organization} onSubmit={this.handleSubmit}/>}
      </div>
    )
  }
}

export default withRouter(OrganizationEdit)
