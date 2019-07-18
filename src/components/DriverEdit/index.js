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

  handleSubmit = ({ id, license_number, phone_number}) =>{
        Api.put(`/driver/${id}`, {license_number, phone_number})
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
        { driver && <DriverForm driver={driver} onSubmit={this.handleSubmit}/>}
      </div>
    )
  }
}

export default withRouter(DriverEdit)
