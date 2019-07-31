import React from 'react'
import { withRouter } from 'react-router-dom'
import DriverForm from '../DriverForm'
import Api from '../../utils/api';

class DriverNew extends React.Component {
  state = {
    driver: {
      email: '',
      full_name: '',
      license_number: '',
      phone_number:'',
      password: ''
    },
    errors: null
  }

  handleSubmit = ({ email, full_name, license_number, phone_number, password, image_file}) =>{
    const request = new FormData()
    request.append('email', email)
    request.append('full_name', full_name)
    request.append('license_number', license_number)
    request.append('phone_number', phone_number)
    request.append('password', password)

    if(image_file){
      request.append('public_service_permission_image', image_file, image_file.name)
    }

    Api.post('/new_driver', request)
      .then(({data}) => {
        this.props.history.push({
          pathname: '/drivers',
          flash: {type: "success", message: 'Taxista creado con exito'}
        });
      }).catch((err) => {
        if (err.response){
          console.log(err.response)
          this.setState({
            errors: [err.response.data.errors]
          })
        }
      })
  }

  render(){
    const { driver } = this.state
    return(
      <div>
        <DriverForm driver={driver} onSubmit={this.handleSubmit} title={"Nuevo taxista"} buttonAction={"Registrar"}/>
      </div>
    )
  }
}

export default withRouter(DriverNew);
