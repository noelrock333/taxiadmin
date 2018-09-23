import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Api from '../../utils/api';
import Alert from '../../sharedComponents/AlertMessage';
import {
  withRouter
} from 'react-router-dom'

class DriverEdit extends Component {
  state = {
    driver: null,
    errors: null
  }

  componentDidMount(){
    const driver_id = this.props.match.params.id;
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

  handleSubmit = event => {
    event.preventDefault();
    let {id, status} = this.state.driver;
    Api.put(`/driver/${id}`, {status})
      .then(({data}) => {
        this.props.history.push({
          pathname: '/drivers',
          flash: {type: "success", message: 'Chofer actualizado con exito'}
        });
      }).catch((err) => {
        this.setState({
          errors: err.response.data.errors
        })
      })
  }

  handleChange = event => {
    this.setState({
      driver: {
        ...this.state.driver,
        [event.target.name]: event.target.value
      }
    });
  }

  render() {
    const {driver, errors} = this.state;
    return (
      <div>
        {errors && <Alert message={errors[0]}/>}
        {driver && 
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="status">Status</Label>
              <Input type="status" name="status" id="status" value={driver.status} onChange={this.handleChange} />
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
        }
      </div>
    )
  }
}

export default withRouter(DriverEdit)
