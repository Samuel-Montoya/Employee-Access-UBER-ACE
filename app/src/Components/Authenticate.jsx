import React from "react"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { setLoginStatus, updateUserInfo } from "../Redux/reducer"
import Login from "./Login/Login"
import axios from "axios"
import { backendURL } from '../urls'

export function authenticateUser(Component) {
  class Authenticate extends React.Component {
    componentWillMount() {
      if (localStorage.getItem("token")) {
        axios
          .get(
            `${backendURL}/api/auth/verifyToken/${localStorage.getItem("token")}`
          )
          .then(response => {
            if (response.data.error) {
              alert("Your session has expired. Please log in.")
              this.props.setLoginStatus(false)
            } else if (response.data.success) {
              this.props.updateUserInfo({
                username: response.data.success.username,
                store: response.data.success.store
              })
              this.props.setLoginStatus(true)
            }
          })
      }
    }

    render() {
      if (this.props.isLoggedIn) {
        return <Component {...this.props} />
      } else {
        // return <Redirect to="/login" />
        return <Login {...this.props} />
      }
    }
  }

  function mapStateToProps(state) {
    return {
      isLoggedIn: state.isLoggedIn
    }
  }
  return connect(mapStateToProps, { setLoginStatus, updateUserInfo })(
    Authenticate
  )
}
