import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class UserForm extends Component  {

  state = {
    user: this.props.user,
  }

  handleChange = event => {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value
      }
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.user);
  }

  render() {
    const {user} = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className="mt-4 row justify-content-center flex-column align-items-center">
        <h2>Edición de usuario</h2>
        <FormGroup className="col-10 col-sm-8 col-md-6 col-lg-4 mt-4">
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" value={user.email} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup className="col-10 col-sm-8 col-md-6 col-lg-4">
          <Label for="full_name">Nombre de usuario</Label>
          <Input type="text" name="full_name" id="full_name" value={user.full_name} onChange={this.handleChange} />
        </FormGroup>
        <Button type="submit">Actualizar</Button>
      </Form>
    )
  }
}

export default UserForm;
