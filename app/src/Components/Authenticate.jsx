import React from 'react'
import { Redirect } from 'react-router-dom'
import SearchComponent from './Dashboard/Dashboard'

export default class Authenticate extends React.Component {
	constructor() {
		super()

		this.state = {
			isLoggedIn: true
		}
	}
	render() {
		if (this.state.isLoggedIn) {
			return <Redirect to="/search" />
		} else {
			return <Redirect to="/login" />
		}
	}
}
