import React from "react"
import "./Dashboard.css"
import Header from "../Header/Header"
import { Link } from "react-router-dom"
import axios from "axios"
import { scroller } from "react-scroll"
import { backendURL } from '../../urls'

export default class Dashboard extends React.Component {
  constructor() {
    super()

    this.state = {
      certificatesToDisplay: [],
      purchasedCertificates: [],
      productTitle: "",
      searchFilter: "certificate_number",
      searchText: "",
      hasSearched: false
    }
  }

  filterCertificates = () => {
    if (this.state.searchText) {
      this.setState({
        certificatesToDisplay: this.state.purchasedCertificates.filter(
          (certificate, index) => {
            let tempCertificate
            if (this.state.searchFilter !== "certificate_number") {
              if (
                certificate[this.state.searchFilter]
                  .toLowerCase()
                  .includes(this.state.searchText.toLowerCase())
              )
                tempCertificate = certificate
            } else {
              if (
                certificate[this.state.searchFilter] === this.state.searchText
              )
                tempCertificate = certificate
            }
            return tempCertificate
          }
        ),
        hasSearched: true
      })
      this.scrollToResults()
    } else {
      this.setState({ certificatesToDisplay: [] })
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    axios
      .get(`${backendURL}/api/get/getAllCertificates`)
      .then(response => {
        axios
          .get(`${backendURL}/api/get/getAllProducts`)
          .then(products => {
            this.setState({
              purchasedCertificates: response.data,
              allProducts: products.data
            })
            if (this.props.location) {
              if (this.props.location.query) {
                if (this.props.location.query.resultsToShow === false) {
                  this.setState({ hasSearched: true })
                  this.scrollToResults()
                } else if (this.props.location.query.searchInfo) {
                  let searchInfo = this.props.location.query.searchInfo
                  this.setState(
                    {
                      searchFilter: searchInfo.searchFilter,
                      searchText: searchInfo.searchInput
                    },
                    () => {
                      this.filterCertificates()
                    }
                  )
                }
              }
            }
          })
      })
  }

  scrollToResults = () => {
    scroller.scrollTo("results_controller", {
      duration: 700,
      smooth: true,
      ignoreCancelEvents: true,
      offset: -200
    })
  }

  render() {
    return (
      <div>
        <Header displayStatus={false} />
        <section className="dashboard_container">
          <div className="dashboard_search-container">
            <h1>Search for a Certificate</h1>
            <section>
              <input
                value={this.state.searchText}
                onChange={input => {
                  if (input.target.value) {
                    this.setState({ searchText: input.target.value })
                  } else
                    this.setState({ searchText: "", certificatesToDisplay: [] })
                }}
                placeholder="Search..."
              />
              <select
                value={this.state.searchFilter}
                onChange={input =>
                  this.setState({ searchFilter: input.target.value })
                }
              >
                <option value="certificate_number">Certificate Number</option>
                <option value="buyer_email">Email</option>
                <option value="buyer_name">Name</option>
                <option value="buyer_phone">Phone Number</option>
              </select>
            </section>
            <hr />
            <button onClick={() => this.filterCertificates()}>Search</button>
          </div>

          <div className="dashboard_results_container">
            <h1 name="results_controller">Search Results</h1>
            <section>
              <h1>TITLE</h1>
              <h2>STATUS</h2>
              <h3>BUYER NAME</h3>
              <h4>CERTIFICATE #</h4>
              <h5>INFO</h5>
            </section>
            {this.state.hasSearched &&
            !this.state.certificatesToDisplay.length ? (
              <h1>No Results...</h1>
            ) : (
              this.allCertificates()
            )}
          </div>
        </section>
      </div>
    )
  }

  allCertificates = () => {
    if (this.state.certificatesToDisplay.length) {
      return this.state.certificatesToDisplay.map((certificate, index) => {
        let color = "#4ED767"
        let icon = "fa fa-check-circle fa-2x"
        if (certificate.status === "Redeemed") {
          color = "#D74E4E"
          icon = "fa fa-times-circle fa-2x"
        }
        certificate.product_title = this.state.allProducts.filter(
          product => product.product_number === certificate.product_number
        )[0].product_title

        return (
          <Link
            key={index}
            to={{
              pathname: "/certificate/" + certificate.certificate_number,
              query: { certificateInfo: certificate }
            }}
          >
            <div className="dashboard_certificate_container">
              <h1>{certificate.product_title}</h1>
              <h2 style={{ fontWeight: "bolder", color: color }}>
                {certificate.status}
              </h2>
              <h3>{certificate.buyer_name}</h3>
              <h4>{certificate.certificate_number}</h4>
              <i className={icon} style={{ color: color }} />
            </div>
          </Link>
        )
      })
    }
  }
}
