import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class DriverForm extends Component  {

  state = {
    driver: this.props.driver
  }

  handleChange = event => {
    this.setState({
      driver: {
        ...this.state.driver,
        [event.target.name]: event.target.value
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.driver);
  }

   render(){
     const {driver} = this.state

     return(
       <Form onSubmit={this.handleSubmit} className="mt-4 row justify-content-center flex-column align-items-center">
        <h2>Edición de taxista</h2>
        <FormGroup className="col-10 col-sm-8 col-md-6 col-lg-4 mt-4">
          <Label for="licencia" >Número de licencia</Label>
          <Input type="text" name="license_number" id="license_number" value={driver.license_number} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup className="col-10 col-sm-8 col-md-6 col-lg-4 mt-4">
          <Label for="phone_number">Teléfono</Label>
          <Input name="phone_number" value={driver.phone_number} id="phone_number" onChange={this.handleChange} maxLength="10"></Input>
        </FormGroup>
        <Button type="submit">Actualizar</Button>
       </Form>
     )
   }

}
export default DriverForm
