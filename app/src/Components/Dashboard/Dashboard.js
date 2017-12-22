import React from 'react'
import './Dashboard.css'
import { purchasedCertificates } from '../../PurchasedCertificates'
import { Link } from 'react-router-dom'

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
        <header className='dashboard_header'>
          <Link to='/dashboard'>
            <img src='http://www.jiffylubesocal.com/wp-content/themes/jiffy/images/main-logo.png' alt='' />
          </Link>

          <Link to='/login'>
            <h1>Log Out</h1>
          </Link>
        </header>

        <div className='dashboard_buttons-container'>

          <div style={{ backgroundColor: '#2780da' }} className='dashboard_buttons' onClick={() => this.updateCertificates('All')}>
            <i style={{ color: 'white', backgroundColor: '#1b5691' }} className="fas fa-list-ul fa-2x" />
            <h1>All Certificates</h1>
          </div>

          <div className='dashboard_buttons' style={{ backgroundColor: '#06ca21' }} onClick={() => this.updateCertificates('Redeemable')}>
            <i style={{ color: 'white', backgroundColor: '#09921c' }} className="fas fa-shopping-cart fa-2x" />
            <h1>Redeemable</h1>
          </div>

          <div style={{ backgroundColor: '#de262c' }} className='dashboard_buttons' onClick={() => this.updateCertificates('Redeemed')}>
            <i style={{ color: 'white', backgroundColor: '#af262a' }} className="fas fa-check fa-2x" />
            <h1>Redeemed</h1>
          </div>

        </div>

        <div className='dashboard_search-container'>
          <input onChange={(input) => { if (input.target.value) { this.setState({ searchText: input.target.value }) } else this.setState({ certificatesToDisplay: purchasedCertificates }) }} placeholder='Search...' />
          <button onClick={() => this.filterCertificates()}>Search</button>
          <select onChange={(input) => this.setState({ searchFilter: input.target.value })}>
            <option value="number">Certificate Number</option>
            <option value="email">Email</option>
            <option value="nameOfBuyer">Name</option>
            <option value="phoneNumber">Phone Number</option>
          </select>
        </div>

        <div className='dashboard_certificate-container'>
          {this.allCertificates()}
        </div>
      </div>
    )
  }

  allCertificates = () => {
    return this.state.certificatesToDisplay.map((certificate, index) => {
      let color = '#06ca21'
      if (certificate.status === 'Redeemed') color = '#ce1616'
      return (
        <Link key={index} to={{ pathname: '/certificate/' + certificate.number, query: { certificateInfo: certificate, index: index } }}>
          <section
            style={{
              borderLeft: '4px solid ' + color
            }}
            className='dashboard_certificate-contents-container'>
            <section className='certificate_header'>
              <h1>{certificate.title}</h1>
              <h1>#{certificate.number}</h1>
            </section>

            <section className='certificate_contents'>
              <h1
                style={{
                  color: color
                }}>
                {certificate.status}
              </h1>
              {certificate.status === 'Redeemed'
                ? <h1>
                  Time Of Redemption: {certificate.dateRedeemed} - {certificate.timeRedeemed} ({certificate.storeRedeemed})
                  </h1>
                : <h1>{certificate.nameOfBuyer} - {certificate.phoneNumber}</h1>}
              <h2 style={{ textDecoration: 'underline' }}>Click for details</h2>
            </section>
          </section>
        </Link>
      )
    })
  }
}
