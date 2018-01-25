import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../const'


class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogin: true,
			email: '',
			password: '',
			name: ''
		};
  	}
	render() {
		return (
			<div>
				<p>{this.state.isLogin? 'Login': 'Signup'}</p>
				{!this.state.isLogin && (<input type="text" placeholder="name" onChange={e => this.setState({name: e.target.value})} />)}
				<input type="text" placeholder="email" onChange={e => this.setState({email: e.target.value})} />
				<input type="password" placeholder="password" onChange={e => this.setState({password: e.target.value})} />
				<button onClick={() => this._submit()}>Submit</button>
				<button onClick={() => this.setState({isLogin: !this.state.isLogin})}>{this.state.isLogin? 'No account': 'Have account'}</button>
			</div>
		);
	}

	_submit = async () => {
	  const { name, email, password } = this.state
	  if (this.state.isLogin) {
	    const result = await this.props.loginA({
	      variables: {
	        email,
	        password,
	      },
	    })
	    const { token } = result.data.login
	    this._saveUserData(token)
	  } else {
	    const result = await this.props.signupA({
	      variables: {
	        name,
	        email,
	        password,
	      },
	    })
	    const { token } = result.data.signup
	    this._saveUserData(token)
	  }
	  this.props.history.push(`/`)
	}
	
	_saveUserData = token => {
		localStorage.setItem(AUTH_TOKEN, token)
	}
}

const querySignup = gql`
	mutation sss($email: String!, $password: String!, $name: String!){
		signup(email: $email, password: $password, name: $name) {
			token
		}
	}
`

const queryLogin = gql`
	mutation lll($email: String!, $password: String!){
		login(email: $email, password: $password) {
			token
		}
	}
`

export default compose(
	graphql(querySignup, {name: 'signupA'}),
	graphql(queryLogin, {name: 'loginA'})
)(Login)
