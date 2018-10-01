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
      })
      .catch(err => {
        console.log(err.response.data)
      });
  }

  deleteUser = (item) => {
    console.log(item)
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
        // filterMethod: (filter, row) =>
        //   row[filter.id].startsWith(filter.value) &&
        //   row[filter.id].endsWith(filter.value)
          // co
          // // var newRows = Object.keys(rows).map(function(key) {
          // //   return {type: key, name: rows[key]};
          // // });
          // console.log(rows)
          // // console.log('Filter', filter)
          // // console.log('Row', this.rows)
          // // _.find()
          // // console.log(filter)
          // // console.log(rows)
          // // console.log(newRows)
          // matchSorter(rowsArr, filter.value, { keys: ["name"] })
        // }
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
      <ReactTable
        filterable
        defaultFilterMethod={(filter, row) =>
          String(row[filter.id]) === filter.value}
        defaultPageSize={10}
        data={data}
        columns={columns}
      />
    )
  }
}
