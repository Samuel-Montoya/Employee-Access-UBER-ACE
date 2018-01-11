import React from 'react'
import './Dashboard.css'
import Header from '../Header/Header';
import { purchasedCertificates } from '../../PurchasedCertificates'
// import { Link } from 'react-router-dom'

export default class Dashboard extends React.Component {
  constructor() {
    super()

    this.state = {
      certificatesToDisplay: purchasedCertificates,
      searchFilter: 'number',
      searchText: ''
    }
  }

  updateCertificates = type => {
    if (type !== 'All') {
      this.setState({
        certificatesToDisplay: purchasedCertificates.filter(function (
          certificate
        ) {
          return certificate.status === type
        })
      })
    } else {
      this.setState({ certificatesToDisplay: purchasedCertificates })
    }
  }

  filterCertificates = () => {
    if (this.state.searchText) {
      this.setState({
        certificatesToDisplay: purchasedCertificates.filter((certificate) => {
          if (this.state.searchFilter !== 'number')
            return certificate[this.state.searchFilter].toLowerCase().includes(this.state.searchText.toLowerCase());
          else
            return certificate[this.state.searchFilter] === Number(this.state.searchText);
        })
      })
    } else {
      this.setState({ certificatesToDisplay: purchasedCertificates })
    }
  }

  render() {
    return (
      <div className='dashboard_container'>
        <Header />
        <section>
          <div className='dashboard_search-container'>
            <h1>Search for a Certificate</h1>
            <section>
              <input onChange={(input) => { if (input.target.value) { this.setState({ searchText: input.target.value }) } else this.setState({ certificatesToDisplay: purchasedCertificates }) }} placeholder='Search...' />
              <select onChange={(input) => this.setState({ searchFilter: input.target.value })}>
                <option value="number">Certificate Number</option>
                <option value="email">Email</option>
                <option value="nameOfBuyer">Name</option>
                <option value="phoneNumber">Phone Number</option>
              </select>
            </section>
            <hr />
            <button onClick={() => this.filterCertificates()}>Search</button>
          </div>

          <div className='dashboard_certificate-container'>
            {this.allCertificates()}
          </div>
        </section>
      </div>
    )
  }

  allCertificates = () => {
    if (this.state.certificatesToDisplay.length) {
      return this.state.certificatesToDisplay.map((certificate, index) => {
        return (
          <div key={index}>

          </div>)
      })
    }
  }
}
