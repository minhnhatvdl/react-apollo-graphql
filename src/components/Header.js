import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../const'
import Logout from './Logout'

class Header extends Component {
  render() {
  	const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div>
      	<Link to="/">List</Link>
      	<Link to="/search">Search</Link>
      	{authToken && (<Link to="/add">Add</Link>)}
		{authToken? (<Logout history={this.props.history} />): (<Link to="/login">Login</Link>)}
      </div>
    );
  }
}

export default withRouter(Header)
