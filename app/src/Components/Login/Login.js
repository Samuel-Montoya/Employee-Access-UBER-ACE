import React from 'react'
import { Redirect } from 'react-router-dom'
import './Login.css'
import { connect } from 'react-redux'
import { setLoginStatus, updateUserInfo } from '../../Redux/reducer'
import axios from 'axios'
import JiffyLubeLogo from '../../resources/JiffyLubeLogo.png'
import styled from 'styled-components'

let ErrorMessageContainer = styled.section`
	position: relative;
	margin: 10px 0 10px 0;
	text-align: center;
	color: #bb0000;
	font-weight: bold;
	font-size: 14px;
	height: 20px;
`

export class Login extends React.Component {
	constructor() {
		super()

		this.state = {
			username: '',
			password: '',
			errorMessage: '',
			statusMessage: 'Log In',
			dev: true
		}
	}

	logInHandler = () => {
		this.setState({ errorMessage: '', statusMessage: 'Loading...' })
		axios
			.get(
				`http://localhost:5000/api/authenticate/${this.state.username}/${
					this.state.password
				}`
			)
			.then(response => {
				if (response.data.error) {
					this.setState({ errorMessage: response.data.error, statusMessage: 'Log In' })
					this.props.setLoginStatus(false)
				} else if (response.data.token) {
					this.setState({ errorMessage: '' })
					localStorage.setItem('token', response.data.token)
					this.props.updateUserInfo({
						username: response.data.username,
						store: response.data.store
					})
					this.props.setLoginStatus(true)
				}
			})
	}

	componentDidMount() {
		if (this.state.dev) {
			this.setState({
				username: 'Shop-524',
				password: 'testpass'
			})
		}
	}

	render() {
		if (this.props.isLoggedIn) {
			return <Redirect to="/search" />
		} else {
			return (
				<div className="login_page_page-container">
					<img className="login_page_logo" src={JiffyLubeLogo} alt="" />
					<div className="login_page_login-container">
						<h1>Employee Access</h1>
						<ErrorMessageContainer>
							<h2>{this.state.errorMessage}</h2>
						</ErrorMessageContainer>
						<input
							value={this.state.username}
							className="login_page_input username"
							placeholder="Store Login"
							onChange={input =>
								this.setState({ username: input.target.value })
							}
						/>
						<input
							value={this.state.password}
							className="login_page_input password"
							type="password"
							placeholder="Password"
							onChange={input =>
								this.setState({ password: input.target.value })
							}
						/>
						<button
							className="login_page_login-button"
							onClick={this.logInHandler}>
							{this.state.statusMessage}
						</button>
					</div>

					<footer className="login_page_footer">Copyright ©</footer>
				</div>
			)
		}
	}
}

function mapStateToProps(state) {
	return {
		isLoggedIn: state.isLoggedIn
	}
}
export default connect(mapStateToProps, { setLoginStatus, updateUserInfo })(
	Login
)
