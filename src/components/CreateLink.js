import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { FEED_QUERY } from './LinkList'

class CreateLink extends Component {
	constructor(props) {
		super(props)
		this.state = {
			description: '',
			url: ''
		}
	}
	render() {
		return (
			<div>
				<input type="text" placeholder="description" onChange={e => this.setState({description: e.target.value})} />
				<input type="text" placeholder="url" onChange={e => this.setState({url: e.target.value})} />
				<button onClick={() => this._add()}>add</button>
			</div>
		);
	}
	_add = async () => {
		const {description, url} = this.state
		await this.props.postLink({
			variables: {
				description,
				url
			},
			update: (store, { data: { post } }) => {
				const data = store.readQuery({ query: FEED_QUERY })
				data.feed.links.splice(0, 0, post)
				store.writeQuery({
				  query: FEED_QUERY,
				  data,
				})
			},
		})
		this.props.history.push('/')
	}
}

const queryPostLink = gql`
	mutation aaa($description: String!, $url: String!){
		post(
			description: $description,
			url: $url
		){
			id
		}
	}
`

export default graphql(queryPostLink, {name: 'postLink'}) (CreateLink)
