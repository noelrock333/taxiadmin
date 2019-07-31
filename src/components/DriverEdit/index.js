import React, { Component } from 'react'
import Alert from '../../sharedComponents/AlertMessage';
import Api from '../../utils/api';
import DriverForm from '../DriverForm'
import { withRouter } from 'react-router-dom'

class DriverEdit extends Component {
  state = {
    driver: null,
    errors: null
  }

  componentDidMount(){
    const driver_id = this.props.match.params.id
    Api.get(`/driver/${driver_id}`)
      .then(({data}) => {
        this.setState({
          driver: data,
        })
      }).catch((err) => {
        this.setState({
          errors: [...err.response.data.errors]
        })
      })
  }

  handleSubmit = ({ id, email, full_name, license_number, phone_number, image_file}) =>{
    const request = new FormData()
    request.append('id', id)
    request.append('email', email)
    request.append('full_name', full_name)
    request.append('license_number', license_number)
    request.append('phone_number', phone_number)
    if(image_file){
      request.append('public_service_permission_image', image_file, image_file.name)
    }

    Api.put(`/driver/${id}`, request, {'Content-Type': 'multipart/form-data' })
      .then(({data}) => {
        this.props.history.push({
          pathname: '/drivers',
          flash: {type: "success", message: 'Taxista actualizado con exito'}
        });
      }).catch((err) => {
        this.setState({
          errors: [err.response.data.errors]
        })
      })
  }

  render() {
    const {driver, errors } = this.state

    return(
      <div>
        { errors && <Alert message={errors[0]}/>}
        { driver && <DriverForm driver={driver} onSubmit={this.handleSubmit} title={"Edición de taxista"} buttonAction={"Actualizar"}/>}
      </div>
    )
  }
}

export default withRouter(DriverEdit)
