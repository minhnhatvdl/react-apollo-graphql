import React, { Component } from 'react'
import { AUTH_TOKEN } from '../const'
import { timeDifferenceForDate } from '../utils'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Link extends Component {
	render() {
		const { index, link } = this.props
		const { description, url } = link
		const authToken = localStorage.getItem(AUTH_TOKEN)
		return(
			<div>
				{index + 1}.
      			{authToken && (<button onClick={() => this._voteForLink()}>▲</button>)}
				{description} - {url}

				{link.votes.length} votes | by{' '}
				{link.postedBy
				? link.postedBy.name
				: 'Unknown'}{' '}
				{timeDifferenceForDate(link.createdAt)}

			</div>
		)
	}
	_voteForLink = async () => {
		const linkId = this.props.link.id
		await this.props.voteA({
			variables: {
				linkId
			},
			update: (store, { data: { vote } }) => {
				this.props.updateStoreAfterVote(store, vote, linkId)
			},
		})
	}
}

const queryVote = gql`
	mutation vvv($linkId: ID!) {
		vote(linkId: $linkId){
			id
		} 
	}
`

export default graphql(queryVote, {name: 'voteA'}) (Link)