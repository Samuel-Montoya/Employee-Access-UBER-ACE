import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import './Login.css'
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

export default class Login extends React.Component {
	constructor() {
		super()

		this.state = {
			username: '',
			password: '',
			errorMessage: '',
			didLogIn: false
		}
	}

	logInHandler = () => {
		this.setState({ errorMessage: '' })
		axios
			.get(
				`http://localhost:5000/api/authenticate/${this.state.username}/${
					this.state.password
				}`
			)
			.then(response => {
				if (response.data.error) {
					this.setState({ errorMessage: response.data.error, didLogIn: false })
				} else if (response.data.storeNumber) {
					this.setState({ errorMessage: '', didLogIn: true })
				}
			})
	}

	render() {
		if (this.state.didLogIn) {
			return <Redirect to="/authenticate" />
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
							onFocus={() => this.setState({ errorMessage: '' })}
						/>
						<input
							value={this.state.password}
							className="login_page_input password"
							type="password"
							placeholder="Password"
							onChange={input =>
								this.setState({ password: input.target.value })
							}
							onFocus={() => this.setState({ errorMessage: '' })}
						/>
						<button
							className="login_page_login-button"
							onClick={this.logInHandler}>
							Log In
						</button>
					</div>

					<footer className="login_page_footer">Copyright ©</footer>
				</div>
			)
		}
	}
}
