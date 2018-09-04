import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class OrganizationForm extends Component  {

  state = {
    organization: this.props.organization,
  }

  handleChange = event => {
    this.setState({
      organization: {
        ...this.state.organization,
        [event.target.name]: event.target.value
      }
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.organization);
  }

  render() {
    const {organization} = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="name">Nombre</Label>
          <Input type="name" name="name" id="name" value={organization.name} onChange={this.handleChange} />
        </FormGroup>
        <Button type="submit">Guardar</Button>
      </Form>
    )
  }
}

export default OrganizationForm;
