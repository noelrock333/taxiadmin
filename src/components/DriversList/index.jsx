import React, { Component } from 'react';
import Api from '../../utils/api';
import AlertMessage from '../../sharedComponents/AlertMessage';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import './DriversList.css'

export default class DriversList extends Component {

  constructor() {
    super()
    this.state = {
      driversRaw: [],
      errors: null,
      flash: null,
      driversList: [],
      pages: 0,
      currentPage: 0,
      searchValue: '',
      loading: true,
    }
  }

  componentDidMount() {
    this.fetchDrivers();
  }

  confirmDelete = (usrId) => {
    var option = window.confirm("Eliminar?");
    if (option == true) {
      this.deleteDriver(usrId);
    }
  } 

  fetchDrivers = () => {
    this.setState({ loading: true });

    Api.get(`/drivers?page=${this.state.currentPage+1}`)
    .then(res => {
      this.setState({
        driversRaw: res.data.drivers,
        pages: res.data.pageCount,
        loading: false
      }, () => {
        this.formatFetchedDrivers(this.state.driversRaw)
      })
    }).catch((err) => {
      this.setState({
        errors: err.response.data.errors
      })
    })
  }

  deleteDriver = (usrId) => {
    Api.delete(`/driver/${usrId}`)
      .then(res => {
        this.setState({
          flash: {
            type: "success",
            message: res.data.flash[0]
          }
        });
        this.fetchDrivers();
      })
      .catch((err) => {
        this.setState({
          errors: { message: err.response.data.errors[0] }
        })
      });
  }

  toggleActivation = (driver_id) => {
    Api.put(`/driver/${driver_id}/activate`)
      .then((res) => {
        this.fetchDrivers()
      })
      .catch((err) => {
        this.setState({
          errors: { message: err.response.data.errors }
        })
      });
  }

  handlePage(page) {
    this.setState({
      currentPage: page 
    }, () => {
      if(this.state.searchValue.length !== 0 && this.state.searchValue !== ' '){
        this.matchDrivers(this.state.searchValue);
      } else {
        this.fetchDrivers();
      }    
    })
  }

  matchDrivers = (value) => {
    if(value.length !== 0 && value !== ' ') {
      this.setState({
        searchValue: value
      }, () => {
        Api.get(`/drivers-search/?search=${this.state.searchValue}&page=${this.state.currentPage+1}`)
          .then((res) => {
            this.setState({
              driversRaw: res.data.drivers,
              pages: res.data.pageCount,
              loading: false
            }, () => {
              this.formatFetchedDrivers(this.state.driversRaw)
            })
          }).catch((err) => {
            this.setState({
              errors: err.response.data.errors
            });
          });
      })
    } else {
      this.setState({
        searchValue: ''
      }, () => {
        this.fetchDrivers();
      })
    } 
  }

  formatFetchedDrivers = (drivers) => {
    var data = [];
    data = drivers.map((driver) => {
      return {
        usrId: driver.id,
        id: driver.id,
        email: driver.email,
        licence: driver.license_number,
        phoneNumber: driver.phone_number,
        name: driver.full_name,
        gafete: driver.public_service_permission_image,
        isActive: driver.active,
      }
    });

    this.setState({
      driversList: data
    });
  }

  handleClick (driverId) {
    this.toggleActivation(driverId)
  }
  
  render() {
    const columns = [
      {
        Header: 'Licencia',
        accessor: 'licence'
      },
      {
        Header: 'Nombre Completo',
        accessor: 'name'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Telefono',
        accessor: 'phoneNumber'
      },
      {
        Header: 'Gafete',
        Cell: (row) => {
          return (
            <a href={`${process.env.REACT_APP_BASE_URL}/${row.original.gafete}`}>
              <img height={60} src={`${process.env.REACT_APP_BASE_URL}/${row.original.gafete}`}/>
            </a>
          )
        }
      },
      {
        Header: 'Activo',
        Cell: (row) => {
          return (
            <label className="switch">
              <input type="checkbox" onChange={() => this.handleClick(row.original.id)} checked={row.original.isActive} />
              <span className="slider round" />
            </label>
          )
        }
      },
      {
        Header: '',
        Cell: row => (
          <div>
            {/* Gone for the moment, the view for drivers edit doesn't exist, might need another story for that */}
            {/* <button className="userListButtons">
              <img src={require('../../images/pencil.png')} className="iconsUserList" onClick={() =>  this.editDriver(row.original.id)}/>
            </button> */}
            <button>
              <img src={require('../../images/trash.png')} className="iconsUserList" onClick={() => this.confirmDelete(row.original.id)}/>
            </button>
          </div>
        ) 
      }
    ]

    return (
      <div>
        <div>
          <input type="text" placeholder="Buscar..." className="search" value={this.state.searchValue} onChange={evt => this.matchDrivers(evt.target.value)} ></input>
        </div>
        <ReactTable
          defaultPageSize={15}
          data={this.state.driversList}
          columns={columns}
          pages={this.state.pages}
          loading={this.state.loading}
          manual
          onPageChange ={(page) => this.handlePage(page)}
        />
      </div>
    )
  }
}
