import React, {Component} from 'react';
import { Table } from 'reactstrap';
import Api from '../../utils/api';
import Item from './Item';
import AlertMessage from '../../sharedComponents/AlertMessage';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class DriversList extends Component {

  state = {
    drivers: [],
    errors: null,
    flash: null,
    selectedPage: 1
  }

  componentDidMount() {
    const flash = this.props.location.flash;
    if (flash) this.setState({flash});
    Api.get('/drivers')
      .then(res => {
        const {drivers, pageCount} = res.data;
        this.setState({
          drivers,
          pageCount
        })
      });
  }

  deleteItem = (driver_id) => {
    Api.delete(`/driver/${driver_id}`)
      .then(res => {
        const drivers = this.state.drivers.filter((driver) => driver.id !== driver_id)
        this.setState({
          drivers,
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
      Api.get(`/drivers?page=${selectedPage + 1}`)
        .then(res => {
          const {drivers, pageCount} = res.data;
          this.setState({
            drivers,
            selectedPage: selectedPage + 1,
            pageCount
          })
        });
    }
  }

  previousItem = () => {
    const {selectedPage} = this.state;
    if (selectedPage > 1){
      Api.get(`/drivers?page=${selectedPage - 1}`)
        .then(res => {
          const {drivers, pageCount} = res.data;
          this.setState({
            drivers,
            selectedPage: selectedPage - 1,
            pageCount
          })
        });
    }
  }

  getPage = event => {
    const page = parseInt(event.target.dataset.page);
    Api.get(`/drivers?page=${page}`)
      .then(res => {
        const {drivers, pageCount} = res.data;
        this.setState({
          drivers,
          selectedPage: page,
          pageCount
        })
      });
  }

  render(){
    const {drivers, errors, flash, pageCount, selectedPage} = this.state;

    return(
      <div>
        <h2>Taxistas</h2>
        {errors && <AlertMessage message={alert.message}/>}
        {flash && <AlertMessage alertType={flash.type} message={flash.message}/>}
        <div>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Licencia</th>
                <th>user_id</th>
                <th>Email</th>
                <th>Telefono</th>
                <th>Gafete</th>
              </tr>
            </thead>
            <tbody>
              {
                drivers.map((driver) => {
                  return <Item key={driver.id} driver={driver} deleteItem={this.deleteItem}/>
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
