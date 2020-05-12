import Alert from 'antd/lib/alert'
import Avatar from 'antd/lib/avatar'
import Button from 'antd/lib/button'
import Col from 'antd/lib/col'
import Divider from 'antd/lib/divider'
import Row from 'antd/lib/row'
import Text from 'antd/lib/typography/Text'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Extension } from '../../../libs/filter-friends/Extension'
import { FBCURL } from '../../../libs/filter-friends/FBCURL'
import { add_facebook_account } from '../../../graphql/add_facebook_account'
import { notification } from 'antd'

export const ChromeExtensionTab = (props: { onCloseModal: Function }) => {
	const [userId, setUserId] = useState<string>('')
	const [cookie, setCookie] = useState<string>('')
	const [error, setError] = useState<any | null>(null)
	const [parsingAccountInformation, setParsingAccountInformation] = useState<
		boolean
	>(false)

	return (
		<>
			<Row gutter={16} align="middle">
				{error && <Alert showIcon type="error" message={error} />}
				<Col xs={8} sm={4}>
					<Avatar
						style={{ width: '100%', height: 'auto' }}
						size={64}
						shape="square"
						src="https://ongmatmedia.com/img/logo.png"
					/>
				</Col>
				<Col xs={16} sm={10} style={{ marginTop: 15 }}>
					<Text>Facebook Extension</Text>
				</Col>
				<Col xs={24} sm={10} style={{ marginTop: 15 }}>
					{!!Extension.installed ? (
						<Button
							type="primary"
							style={{ width: '100%' }}
							onClick={async () => {
								setUserId('')
								setCookie('')
								const data = await Extension.get_facebook_current_user()
								if (data) {
									setUserId(data.uid)
									setCookie(data.cookie)
								} else setError('Can not get cookie from https://facebook.com')
							}}
						>
							{userId ? 'Rescan accounts' : 'Scan accounts'}
						</Button>
					) : (
						<Button type="primary">
							<Link to="">Install now</Link>
						</Button>
					)}
				</Col>
				{!!userId && !!cookie && (
					<Col xs={24}>
						<Divider />
						<Col xs={8} sm={4}>
							<Avatar
								style={{ width: '100%', height: 'auto' }}
								size={64}
								shape="circle"
								src={`http://graph.facebook.com/${userId}/picture?type=large`}
							/>
						</Col>
						<Col xs={16} sm={10} style={{ marginTop: 15 }}>
							<Text>{userId}</Text>
						</Col>
						<Col xs={24} sm={10} style={{ marginTop: 15 }}>
							<Button
								style={{ width: '100%' }}
								loading={parsingAccountInformation}
								disabled={parsingAccountInformation}
								onClick={async () => {
									setParsingAccountInformation(true)
									try {
										const fb = await FBCURL.fromCookie(cookie)
										const livestreamAccessToken = await fb.getLivestreamAccessToken()
										await add_facebook_account({
											cookie,
											id: fb.user_id,
											livestream_access_token: livestreamAccessToken,
											name: fb.name,
											touch_access_token: fb.eaa_token,
										})
										setParsingAccountInformation(false)
										props.onCloseModal()
										notification.success({
											message: 'Operation: Add account',
											description: 'Successfully',
										})
									} catch (error) {
										setError(error)
										setParsingAccountInformation(false)
										props.onCloseModal()
									}
								}}
							>
								Add account
							</Button>
						</Col>
					</Col>
				)}
				{error && <Alert showIcon type={error} message={error} />}
			</Row>
		</>
	)
}
