import React, {Component} from 'react';
import { Table } from 'reactstrap';
import Api from '../../utils/api';
import Item from './Item';
import AlertMessage from '../../sharedComponents/AlertMessage';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class UsersList extends Component {

  state = {
    users: [],
    errors: null,
    flash: null,
    selectedPage: 1
  }

  componentDidMount() {
    const flash = this.props.location.flash;
    if (flash) this.setState({flash});
    Api.get('/users')
      .then(res => {
        const {users, pageCount} = res.data;
        this.setState({
          users,
          pageCount: res.data.pageCount
        })
      });
  }

  deleteItem = (user_id) => {
    Api.delete(`/user/${user_id}`)
      .then(res => {
        const users = this.state.users.filter((user) => user.id !== user_id)
        this.setState({
          users,
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
      Api.get(`/users?page=${selectedPage + 1}`)
        .then(res => {
          const {users, pageCount} = res.data;
          this.setState({
            users,
            selectedPage: selectedPage + 1,
            pageCount
          })
        });
    }
  }

  previousItem = () => {
    const {selectedPage} = this.state;
    if (selectedPage > 1){
      Api.get(`/users?page=${selectedPage - 1}`)
        .then(res => {
          const {users, pageCount} = res.data;
          this.setState({
            users,
            selectedPage: selectedPage - 1,
            pageCount
          })
        });
    }
  }

  getPage = event => {
    const page = parseInt(event.target.dataset.page);
    Api.get(`/users?page=${page}`)
      .then(res => {
        const {users, pageCount} = res.data;
        this.setState({
          users,
          selectedPage: page,
          pageCount
        })
      });
  }

  render(){
    const {users, errors, flash, pageCount, selectedPage} = this.state;

    return(
      <div>
        <h2>Usuarios</h2>
        {errors && <AlertMessage message={alert.message}/>}
        {flash && <AlertMessage alertType={flash.type} message={flash.message}/>}
        <div>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre completo</th>
                <th>Email</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user) => {
                  return <Item key={user.id} user={user} deleteItem={this.deleteItem}/>
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
