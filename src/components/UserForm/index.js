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
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" value={user.email} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="full_name">Full_name</Label>
          <Input type="text" name="full_name" id="full_name" value={user.full_name} onChange={this.handleChange} />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    )
  }
}

export default UserForm;
