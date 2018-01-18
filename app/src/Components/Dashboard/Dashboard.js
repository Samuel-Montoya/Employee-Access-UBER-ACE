import React from 'react'
import './Dashboard.css'
import Header from '../Header/Header';
import { purchasedCertificates } from '../../PurchasedCertificates'
import { Link } from 'react-router-dom';
import { scroller } from 'react-scroll';

export default class Dashboard extends React.Component {
  constructor() {
    super()

    this.state = {
      certificatesToDisplay: [],
      searchFilter: 'number',
      searchText: '',
      hasSearched: false
    }
  }

  filterCertificates = () => {
    if (this.state.searchText) {
      this.setState({
        certificatesToDisplay: purchasedCertificates.filter((certificate, index) => {
          if (this.state.searchFilter !== 'number') {
            if (certificate[this.state.searchFilter].toLowerCase().includes(this.state.searchText.toLowerCase())) {
              return certificate;
            }
          }
          else
            if (certificate[this.state.searchFilter] === Number(this.state.searchText)) {
              return certificate;
            }
        }),
        hasSearched: true
      }),
        scroller.scrollTo('results_controller', {
          duration: 700,
          smooth: true,
          ignoreCancelEvents: true
        })
    } else {
      this.setState({ certificatesToDisplay: [] })
    }
  }

  render() {
    console.log(this.state.index)
    return (
      <div>
        <Header />
        <section className='dashboard_container'>
          <div className='dashboard_search-container'>
            <h1>Search for a Certificate</h1>
            <section>
              <input onChange={(input) => { if (input.target.value) { this.setState({ searchText: input.target.value }) } else this.setState({ searchText: '', certificatesToDisplay: [] }) }} placeholder='Search...' />
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

          <div className='dashboard_results_container' name='results_controller'>
            <h1>Search Results</h1>
            <section>
              <h1>TITLE</h1>
              <h2>STATUS</h2>
              <h3>BUYER NAME</h3>
              <h4>CERTIFICATE #</h4>
              <h5>INFO</h5>
            </section>
            {this.state.hasSearched && !this.state.certificatesToDisplay.length ? <h1>No Results...</h1> : this.allCertificates()}
          </div>
        </section>
      </div>
    )
  }

  allCertificates = () => {
    if (this.state.certificatesToDisplay.length) {
      return this.state.certificatesToDisplay.map((certificate, index) => {
        let color = '#4ED767';
        let icon = 'fa fa-check-circle fa-2x';
        if (certificate.status === 'Redeemed') {
          color = '#D74E4E';
          icon = 'fa fa-times-circle fa-2x';
        }
        return (
          <Link key={index} to={{ pathname: '/certificate/' + certificate.number, query: { certificateInfo: certificate } }}>
            <div className='dashboard_certificate_container'>
              <h1>{certificate.title}</h1>
              <h2 style={{ fontWeight: 'bolder', color: color }}>{certificate.status}</h2>
              <h3>{certificate.nameOfBuyer}</h3>
              <h4>{certificate.number}</h4>
              <i className={icon} style={{ color: color }} />
            </div>
          </Link>)
      })
    }
  }
}
