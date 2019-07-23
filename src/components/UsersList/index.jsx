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
      pages: 0,
      currentPage: 0,
      errors: null,
      searchValue: '',
      loading: true
    }
  }

  componentDidMount() {
    this.fetchUsers()
  }

  confirmDelete = (usrId) => {
    var opcion = window.confirm("Eliminar?");
    if (opcion === true) {
      this.deleteUser(usrId)
    }
  }

  fetchUsers () {
    this.setState({ loading: true });
    Api.get(`/users?page=${this.state.currentPage+1}`)
      .then(res => {
        this.setState({
          pages: res.data.pageCount,
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

  editUser = (usrId) => {
    const path = `/user/${usrId}`
    const edit_path = `${path}/edit`
    this.props.history.push(edit_path)
  }

  deleteUser = (usrId) => {
    Api.delete(`/user/${usrId}`)
      .then(res => {
        const users = this.state.users.filter((user) => user.id !== usrId)
        this.setState({
          users,
          flash: {
            type: "success",
            message: res.data.flash[0]
          }
        })
        this.fetchUsers()
      })
      .catch((err) => {
        this.setState({
          errors: { message: err.response.data.errors[0] }
        })
      });
  }

  matchUsers = (value) => {
    if(value.length !== 0 && value !== ' ') {
      this.setState({
        searchValue: value
      }, () => {
        Api.get(`/users-search/?search=${this.state.searchValue}&page=${this.state.currentPage+1}`)
          .then((res) => {
            this.setState({
              users: res.data.users,
              pages: res.data.pageCount
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
      if(this.state.searchValue.length !== 0 && this.state.searchValue !== ' '){
        this.matchUsers(this.state.searchValue)
      } else {
        this.fetchUsers()
      }
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
              <button className="userListButtons"><img alt="Editar" src={require('../../images/pencil.png')} className="iconsUserList" onClick={() =>  this.editUser(row.original.id)}/></button>
              <button className="userListButtons"><img alt="Borrar" src={require('../../images/trash.png')} className="iconsUserList" onClick={() => this.confirmDelete(row.original.id)}/></button>
           </div>
       )
      }
    ]
    return(
      <div>
        <h2 className="text-center my-4">Usuarios</h2>
        <div>
          <input type="text" placeholder="Buscar..." className="search" value={this.state.searchValue} onChange={evt => this.matchUsers(evt.target.value)} ></input>
        </div>
        <ReactTable
          defaultPageSize={15}
          data={this.state.userList}
          columns={columns}
          pages={this.state.pages}
          loading={this.state.loading}
          manual
          onPageChange={(page) => this.handlePage(page)}
        />
      </div>
    )
  }
}
