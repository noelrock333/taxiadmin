import React, {Component} from 'react';
import Api from '../../utils/api';
import AlertMessage from '../../sharedComponents/AlertMessage';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './OrganizationsList.css'

export default class DriversList extends Component {

  constructor() {
    super()
    this.state = {
      taxiSitesRaw: [],
      taxiSitesList: [],
      loading: true,
      currentPage: 0,
      pages: 0,
      errors: null,
      name: '',
      flash: null,
      siteName: ''
    }
  }

  componentDidMount() {
    const flash = this.props.location.flash
    if(flash) {
      this.setState({flash})
    }
    this.fetchTaxiSites()
  }

  confirmDelete = (siteId) => {
    if (window.confirm("Eliminar?")) {
      this.deleteTaxiSite(siteId)
    }
  }

  fetchTaxiSites = () => {
    this.setState({ loading: true })
    Api.get(`/organizations?page=${this.state.currentPage+1}`)
      .then(res => {
        this.setState({
          taxiSitesRaw: res.data.organizations,
          pages: res.data.pageCount,
          loading: false
        }, () => {
          this.formatFetchedSites(this.state.taxiSitesRaw)
        })
    }).catch((err) => {
      this.setState({
        errors: err.response.data.errors
      })
    })
  }

  formatFetchedSites = (taxiSites) => {
    var data = []
    data = taxiSites.map((site) => {
      return {
        siteId: site.id,
        createdAt: site.created_at,
        siteName: site.name,
        updatedAt: site.updated_at
      }
    })

    this.setState({
      taxiSitesList: data
    })
  }

  editOrganization = (organizationId) => {
    const path = `/organization/${organizationId}`
    const editPath = `${editPath}/edit`
    this.props.history.push(editPath)
  }

  handlePage(page) {
    this.setState({
      currentPage: page
    }, () => {
      this.fetchTaxiSites();
    })
  }

  deleteTaxiSite = (siteId) => {
    Api.delete(`/organization/${siteId}`)
      .then(res => {
        this.setState({
          flash: {
            type: "success",
            message: res.data.flash[0]
          }
        })
        this.fetchTaxiSites();
      })
      .catch((err) => {
        this.setState({
          errors: { message: err.response.data.errors[0] }
        })
      })
  }

  createOrganization = () => {
    Api.post(`/organizations?name=${this.state.siteName}`)
      .then(res => {
        this.setState({
          flash: {
            type: "success",
            message: res.statusText
          }
        })
        this.fetchTaxiSites();
      })
      .catch((err) => {
        this.setState({
          errors: { message: err.response.data.errors[0]}
        })
      })
  }

  render () {
    const columns = [
      {
        Header: 'Nombre del sitio',
        accessor: 'siteName'
      },
      {
        Header: '',
        Cell: row => (
          <div>
            <button className="userListButtons">
              <img src={require('../../images/pencil.png')} className="iconsUserList" onClick={() =>  this.editOrganization(row.original.siteId)}/>
            </button>
            <button className="userListButtons">
              <img src={require('../../images/trash.png')} className="iconsUserList" onClick={() => this.confirmDelete(row.original.siteId)}/>
            </button>
          </div>
        )
      }
    ]

    return (
      <div>
        <div className="topMargin">
          <h2 className="text-center my-4">Sitios</h2>
          <div className="taxiSitesCreateDiv">
            <input type="text" placeholder="Crear un sitio...." className="siteNameInput" value={this.state.siteName} onChange={(evt) => this.setState({siteName: evt.target.value})}></input>
            <button type="button" className="createBtn" onClick={() => this.createOrganization()}>Crear</button>
          </div>
          <ReactTable
            defaultPageSize={10}
            data={this.state.taxiSitesList}
            columns={columns}
            pages={this.state.pages}
            loading={this.state.loading}
            onPageChange = {(page) => this.handlePage(page)}
            manual
          />
        </div>
      </div>
    )
  }

}
