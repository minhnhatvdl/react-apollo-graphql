import React, { Component } from 'react'
import Link from './Link'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class LinkList extends Component {
	render() {
		const {error, loading, feed} = this.props.listLink
		if(loading) return <div>Loading...</div>
		if(error) return <div>Error</div>
		return(
			<div>
				{feed.links.map((e, i) => <Link key={e.id} updateStoreAfterVote={this._updateCacheAfterVote} index={i} link={e}/>)}
			</div>
		)
	}


	_updateCacheAfterVote = (store, createVote, linkId) => {
		// 1
		const data = store.readQuery({ query: FEED_QUERY })

		// 2
		const votedLink = data.feed.links.find(link => link.id === linkId)
		votedLink.votes = createVote.link.votes

		// 3
		store.writeQuery({ query: FEED_QUERY, data })
	}
}

export const FEED_QUERY = gql`
	query {
		feed {
			links {
			    id
			    createdAt
			    url
			    description
			    postedBy {
			      id
			      name
			    }
			    votes {
			      id
			      user {
			        id
			      }
			    }
			 }
		}
	}	
`

export default graphql(FEED_QUERY, {name: 'listLink'}) (LinkList)