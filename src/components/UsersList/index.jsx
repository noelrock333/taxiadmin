import React, {Component} from 'react';
import Api from '../../utils/api';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import './UsersList.css'
import _ from 'lodash'

export default class UsersList extends Component {
  constructor () {
    super()
    this.state = { 
      users: [],
      errors: null,
      flash: null,
      searchValue: '',
      userList: []
    }
  }

  componentDidMount() {
    const flash = this.props.location.flash
    if (flash) this.setState({flash})
    this.fetchUsers()
  }

  fetchUsers () {
    Api.get('/users')
      .then(res => {
        this.setState({
          users: res.data.users,
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

  matchUsers = (value) => {
    if(value.length !== 0 && value !== ' ') {
      this.setState({
        searchValue: value
      }, () => {
        var valueToMatch = this.state.searchValue
        Api.get(`/users-search/${this.state.searchValue}`)
          .then(({data}) => {
            this.setState({
              users: data
            }, () => {
              this.formatUsersForTable(this.state.users)
            })
          }).catch((err) => {
            this.setState({
              errors: err.response.data.errors
            })
          })
      })
    } else {
      this.setState({
        searchValue: ''
      }, () => {
        this.fetchUsers()
      })
    } 
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
        <div>
          <input type="text" placeholder="Buscar..." className="search" value={this.state.searchValue} onChange={evt => this.matchUsers(evt.target.value)} ></input>
        </div>
        <ReactTable
          defaultPageSize={10}
          data={this.state.userList}
          columns={columns}
        />
      </div>
    )
  }
}
