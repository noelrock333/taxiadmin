import React, {Component} from 'react';
import { Table, Button, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import Api from '../../utils/api';
import Item from './Item';
import AlertMessage from '../../sharedComponents/AlertMessage';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class DriversList extends Component {

  state = {
    organizations: [],
    errors: null,
    flash: null,
    selectedPage: 1,
    name: ''
  }

  componentDidMount() {
    const flash = this.props.location.flash;
    if (flash) this.setState({flash});
    Api.get('/organizations')
      .then(res => {
        const {organizations, pageCount} = res.data;
        this.setState({
          organizations,
          pageCount
        })
      });
  }

  deleteItem = (driver_id) => {
    Api.delete(`/driver/${driver_id}`)
      .then(res => {
        const organizations = this.state.organizations.filter((driver) => driver.id !== driver_id)
        this.setState({
          organizations,
          flash: {
            type: "success",
            message: res.data.flash[0]
          }
        })
      })
      .catch((err) => {
        this.setState({
          errors: { message: err.response.data.errors[0] }
        })
      });
  }

  nextItem = () => {
    const {selectedPage, pageCount} = this.state;
    if (selectedPage < pageCount){
      Api.get(`/organizations?page=${selectedPage + 1}`)
        .then(res => {
          const {organizations, pageCount} = res.data;
          this.setState({
            organizations,
            selectedPage: selectedPage + 1,
            pageCount
          })
        });
    }
  }

  previousItem = () => {
    const {selectedPage} = this.state;
    if (selectedPage > 1){
      Api.get(`/organizations?page=${selectedPage - 1}`)
        .then(res => {
          const {organizations, pageCount} = res.data;
          this.setState({
            organizations,
            selectedPage: selectedPage - 1,
            pageCount
          })
        });
    }
  }

  getPage = event => {
    const page = event.target ? parseInt(event.target.dataset.page) : event;
    Api.get(`/organizations?page=${page}`)
      .then(res => {
        const {organizations, pageCount} = res.data;
        this.setState({
          organizations,
          selectedPage: page,
          pageCount
        })
      });
  }

  newItem = ({ name }) => {
    Api.post(`/organizations`, { name })
      .then(res => {
        this.getPage(this.state.selectedPage);
      });
  }

  createOrganization = () => {
    const { name } = this.state;
    this.newItem({ name });
  }

  render(){
    const {organizations, errors, flash, pageCount, selectedPage, name} = this.state;

    return(
      <div>
        <h2>Taxistas</h2>
        {errors && <AlertMessage message={alert.message}/>}
        {flash && <AlertMessage alertType={flash.type} message={flash.message}/>}
        <div>
          <div>
          <InputGroup>
            <Input value={name} onChange={(ev) => this.setState({ name: ev.target.value })}/>
            <InputGroupAddon addonType="prepend"><Button onClick={this.createOrganization}>Crear</Button></InputGroupAddon>
          </InputGroup>
          </div>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre del sitio</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                organizations.map((organization) => {
                  return <Item key={organization.id} organization={organization} deleteItem={this.deleteItem}/>
                })
              }
            </tbody>
          </Table>
          <Pagination className="pagination" >
            <PaginationItem>
              <PaginationLink previous onClick={this.previousItem}/>
            </PaginationItem>
            {
              new Array(pageCount).fill(0).map((val, index) => {
                return(
                  <PaginationItem active={index + 1 === selectedPage}>
                    <PaginationLink data-page={index + 1} onClick={this.getPage}>
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                )
              })
            }
            <PaginationItem>
              <PaginationLink next onClick={this.nextItem}/>
            </PaginationItem>
          </Pagination>
        </div>
      </div>
    )
  }
}
