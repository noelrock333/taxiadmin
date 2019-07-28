import React, {Component} from 'react';
import './servicesList.css'
import { Table } from 'reactstrap';
import Api from '../../utils/api';
import Item from './Item';
import AlertMessage from '../../sharedComponents/AlertMessage';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class ServicesList extends Component {

  state = {
    services: [],
    errors: null,
    flash: null,
    selectedPage: 1
  }

  componentDidMount() {
    const flash = this.props.location.flash;
    if (flash) this.setState({flash});
    Api.get('/services')
      .then(res => {
        const {services, pageCount} = res.data;
        this.setState({
          services,
          pageCount
        })
      });
  }

  deleteItem = (service_id) => {
    Api.delete(`/service/${service_id}`)
      .then(res => {
        const services = this.state.services.filter((service) => service.id !== service_id)
        this.setState({
          services,
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
      Api.get(`/services?page=${selectedPage + 1}`)
        .then(res => {
          const {services, pageCount} = res.data;
          this.setState({
            services,
            selectedPage: selectedPage + 1,
            pageCount
          })
        });
    }
  }

  previousItem = () => {
    const {selectedPage} = this.state;
    if (selectedPage > 1){
      Api.get(`/services?page=${selectedPage - 1}`)
        .then(res => {
          const {services, pageCount} = res.data;
          this.setState({
            services,
            selectedPage: selectedPage - 1,
            pageCount
          })
        });
    }
  }

  getPage = event => {
    const page = parseInt(event.target.dataset.page);
    Api.get(`/services?page=${page}`)
      .then(res => {
        const {services, pageCount} = res.data;
        this.setState({
          services,
          selectedPage: page,
          pageCount
        })
      });
  }

  render(){
    const {services, errors, flash, pageCount, selectedPage} = this.state;
    return(
      <div>
        <h2 className="text-center my-4">Tipos de servicios</h2>
        {errors && <AlertMessage message={alert.message}/>}
        {flash && <AlertMessage alertType={flash.type} message={flash.message}/>}
        <div>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Tipo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                services.map((service) => {
                  return <Item key={service.id} service={service} deleteItem={this.deleteItem}/>
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
                  <PaginationItem key={index} active={index + 1 === selectedPage}>
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
