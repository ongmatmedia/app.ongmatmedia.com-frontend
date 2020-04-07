import Avatar from 'antd/lib/avatar'
import Button from 'antd/lib/button'
import List from 'antd/lib/list'
import React from 'react'
import { LivestreamFacebookTargetInput } from '../../../types'

const FacebookIcon = {
	profile:
		'https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png',
	group: 'https://www.codester.com/static/uploads/items/5415/icon.png',
	page:
		'https://www.socialmediaexaminer.com/wp-content/uploads/2014/07/kl-facebook-pages-app-logo.jpg',
}

export const TargetsListReview = (props: {
	list: LivestreamFacebookTargetInput[]
	onRemove: Function
}) => (
	<List
		className="target-list-review"
		bordered
		itemLayout="horizontal"
		dataSource={props.list}
		renderItem={item => (
			<List.Item
				actions={[
					<Button
						type="danger"
						icon="close"
						onClick={() => props.onRemove(item.uid)}
					>
						Remove
					</Button>,
				]}
				key={item.uid}
			>
				<List.Item.Meta
					avatar={<Avatar src={FacebookIcon[`${item.type}`]} />}
					title={<a href={`https://fb.com/${item.uid}`}>{item.name}</a>}
				/>
			</List.Item>
		)}
	/>
)
