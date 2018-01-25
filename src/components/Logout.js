import React, { Component } from 'react'
import { AUTH_TOKEN } from '../const'

class Logout extends Component {
	render() {
		return (
			<buttton onClick={() => this._logout()}>Logout</buttton>
		);
	}
	_logout() {
		localStorage.removeItem(AUTH_TOKEN)
		this.props.history.push('/')
	}
}

export default Logout
