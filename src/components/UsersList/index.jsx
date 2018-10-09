import React, {Component} from 'react';
import Api from '../../utils/api';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import './UsersList.css'

export default class UsersList extends Component {
  constructor () {
    super()
    this.state = { 
      users: [],
      pageZise: 0,
      resized: [],
      filtered: [],
      currentPage: 0,
      errors: null
    }
    this.fetchUsers = this.fetchUsers.bind(this)
  }

  fetchUsers () {
    this.setState({ loading: true });
    Api.get(`/users?page=${this.state.currentPage+1}`)
      .then(res => {
        this.setState({
          pageZise: res.data.pageCount,
          users: res.data.users,
          loading: false
        }, () => {
          this.formatUsersForTable(this.state.users)
        })
      })
      .catch(err => {
        this.setState({
          errors: err.response.data.errors
        })
      });
  } 

  editUser = (item) => {
    const path = `/user/${item.id}`
    const edit_path = `${path}/edit`
    this.props.history.push(edit_path)
  }

  deleteUser = (item) => {
    Api.delete(`/user/${item.id}`)
      .then(res => {
        const users = this.state.users.filter((user) => user.id !== item.id)
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
  
  formatUsersForTable = (users) => {
    var data = [];
    data = users.map(user => {
      const newUsr = {}
      newUsr.id = user.id
      newUsr.name = user.full_name
      newUsr.email = user.email
      newUsr.tel = user.phone_number
      return newUsr
    })
    this.setState({
      userList: data
    })
  }

  handlePage(page) {
    this.setState({
      currentPage: page 
    }, () => {
      this.fetchUsers()
    })
  }


  render(){
    const columns = [{
        Header: 'Nombre Completo',
        accessor: 'name',
      }, {
        Header: 'Email',
        accessor: 'email',
      }, {
        Header: 'Telefono',
        accessor: 'tel'
      }, {
      Header: '',
       Cell: row => (
           <div>
              <button className="userListButtons"><img src={require('../../images/pencil.png')} className="iconsUserList" onClick={() =>  this.editUser(row.original)}/></button>
              <button className="userListButtons"><img src={require('../../images/trash.png')} className="iconsUserList" onClick={() => this.deleteUser(row.original)}/></button>
           </div>
       )
      }
    ]
    return(
      <div>
        <div className="search">
          {/* <input type="text" placeholder="No funciona de momento..." className="search" value={this.state.searchValue} onChange={evt => this.matchUsers(evt.target.value)} ></input> */}
        </div>
        <ReactTable
          defaultPageSize={15}
          data={this.state.userList}
          columns={columns}
          pages={this.state.pageZise}
          loading={this.state.loading}
          manual
          onPageChange={(page) => this.handlePage(page)}
          onFetchData = {this.fetchUsers}
        />
      </div>
    )
  }
}
