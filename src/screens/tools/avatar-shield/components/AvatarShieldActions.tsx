import React from 'react'
import { Row, Col, Select, Avatar } from 'antd'
import { Extension } from '../../../../libs/filter-friends/Extension'
import { FBCURL } from '../../../../libs/filter-friends/FBCURL'
import axios from 'axios'

const { Option } = Select

interface AvatarShieldActionsProps {
	accounts: {
		id: string
		name: string
		cookie: string
	}[]
	onSelectAccount?: (data: {
		id: string
		username: string
		coverUrl: string
		cookie: string
	}) => void
	onLoading: (status: boolean) => void
}

export const AvatarShieldAction: React.FunctionComponent<AvatarShieldActionsProps> = ({
	accounts,
	onSelectAccount,
	onLoading,
}) => {
	const loadAccountInformation = async (cookie: string) => {
		onLoading(true)
		const user_id_match = cookie.match(/c_user=([0-9]+)/)
		if (user_id_match) {
			const user_id = user_id_match[1]
			const data = await Extension.get_facebook_current_user()
			const fb = await FBCURL.fromCookie(
				data?.uid == user_id ? data.cookie : cookie,
			)
			const result = await axios.get<{ cover: { source: string } }>(
				`https://graph.facebook.com/${user_id}?fields=cover&access_token=${fb.eaa_token}`,
			)
			onLoading(false)
			onSelectAccount({
				id: user_id,
				username: fb.name,
				cookie: data?.uid == user_id ? data.cookie : cookie,
				coverUrl: result.data.cover.source,
			})
		}
	}

	return (
		<Row>
			<Col xs={24} sm={{ offset: 8, span: 8 }}>
				<Select
					style={{ width: '100%' }}
					size="large"
					placeholder="Select an account"
					onChange={cookieValue =>
						loadAccountInformation(cookieValue.toString())
					}
				>
					{accounts.map(account => (
						<Option key={account.id} value={account.cookie}>
							<Avatar
								src={`https://graph.facebook.com/${account.id}/picture?type=large`}
							/>{' '}
							&nbsp; {account.name}
						</Option>
					))}
				</Select>
			</Col>
		</Row>
	)
}
