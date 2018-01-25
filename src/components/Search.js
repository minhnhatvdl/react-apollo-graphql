import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Link from './Link'

class Search extends Component {
	constructor(props) {
	  super(props)
	  this.state = {
	  	links: [],
	  	search: ''
	  }
	}
	render() {
		return(
			<div>
				<input type="text" onChange={e => this.setState({search: e.target.value})} />
				<button onClick={() => this._search()}>Search</button>
				{this.state.links.map((e, i) => <Link key={e.id} link={e} index={i} />)}
			</div>
		)
	}
	_search = async () => {
		const { search } = this.state

		const result = await this.props.client.query({
			query: FEED_SEARCH_QUERY,
			variables: { filter: search },
		})
		const links = result.data.feed.links
		this.setState({ links })
	}
}

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      links {
        id
        url
        description
        createdAt
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

export default withApollo(Search)