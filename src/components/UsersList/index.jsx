import React, {Component} from 'react';
import Api from '../../utils/api';
import Item from './Item';
import AlertMessage from '../../sharedComponents/AlertMessage';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import './UsersList.css'
import matchSorter from 'match-sorter'
import _ from 'lodash'

export default class UsersList extends Component {
  //The code here is incomplete. It works, but its buggy and needs refactorization here and there. Working on it. Pushed it for reviews and comments.
  state = {
    users: [],
    errors: null,
    flash: null,
    selectedPage: 1,
    searchValue: ''
  }

  updateSearch = (val) => {
    if(val) {
      Api.get(`/users-search/${val}`)
      .then(({data}) => {
        this.setState({
          users: data
        })
        console.log(data)
      }).catch((err) => {
         console.log(err)
        this.setState({
          errors: err.response.data.errors
        })
      })
    }
    this.fetchUsers()
  }

  updateInputValue(evt) {
    this.setState({
      searchValue: evt.target.value
    })
    this.updateSearch(this.state.searchValue)  
  }

  fetchUsers() {
    Api.get('/users')
      .then(res => {
        const {users, pageCount} = res.data;
        this.setState({
          users,
          pageCount: res.data.pageCount
        })
      })
      .catch(err => {
        console.log(err.response.data)
      });
  }

  componentDidMount() {
    const flash = this.props.location.flash;
    if (flash) this.setState({flash});
    this.fetchUsers()
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

  editUser = (item) => {
    const path = `/user/${item.id}`;
    const edit_path = `${path}/edit`;
    this.props.history.push(edit_path)
  }

  render(){
    const data = [];

    this.state.users.forEach(element => {
      const newUsr = {}
      newUsr.id = element.id
      newUsr.name = element.full_name 
      newUsr.email = element.email
      newUsr.tel = element.phone_number
      data.push(newUsr)
    });

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
          <input type="text" placeholder="Buscar..."  value={this.state.searchValue} onChange={evt => this.updateInputValue(evt)} ></input>
        </div>
        <ReactTable
          defaultPageSize={10}
          data={data}
          columns={columns}
        />
      </div>
    )
  }
}
