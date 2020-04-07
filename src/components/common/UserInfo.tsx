import graphql from 'babel-plugin-relay/macro'
import React, { FunctionComponent, ReactNode } from 'react'
import { QueryRenderer } from 'react-relay'
import { RelayEnvironment } from '../../graphql/RelayEnvironment'
import { User } from '../../types'

type UserInfoProps = {
	render: (loading: boolean, user: User | null) => ReactNode
}

const query = graphql`
	query UserInfoQuery {
		me {
			id
			username
			balance
			price_percent
			creator_id
		}
	}
`

export const UserInfo = (props: UserInfoProps) => (
	<QueryRenderer
		environment={RelayEnvironment}
		query={query}
		variables={{}}
		render={rs =>
			props.render(rs.props == null, rs.props ? (rs as any).props.me : null)
		}
	/>
)

export const withUserInfo = <P extends {}>(
	C: FunctionComponent<{ loading: boolean; me: User | null } & P>,
) => (props: P) => (
	<QueryRenderer
		environment={RelayEnvironment}
		query={query}
		variables={{}}
		render={rs => (
			<C
				loading={rs.props == null}
				me={(rs.props as User) || null}
				{...props}
			/>
		)}
	/>
)
