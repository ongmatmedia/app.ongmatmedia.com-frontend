import Comment from 'antd/lib/comment'
import Icon from 'antd/lib/icon'
import List from 'antd/lib/list'
import Tooltip from 'antd/lib/tooltip'
import React from 'react'

const actions = [
	<span key="comment-basic-like">
		<Tooltip title="Like">
			<Icon type="like" />
		</Tooltip>
		<span style={{ paddingLeft: 8, cursor: 'auto' }}>10</span>
	</span>,
	<span key=' key="comment-basic-dislike"'>
		<Tooltip title="Dislike">
			<Icon type="dislike" />
		</Tooltip>
		<span style={{ paddingLeft: 8, cursor: 'auto' }}>10</span>
	</span>,
	<span key="comment-basic-reply-to">Reply to</span>,
]

export const ListVideoComment = (props: {
	data: Array<{
		author: string
		content: JSX.Element
		avatar: string
		datetime: JSX.Element
	}>
}) => (
	<>
		<List
			className="comment-list"
			itemLayout="horizontal"
			dataSource={props.data}
			renderItem={item => (
				<li>
					<Comment
						actions={actions}
						author={item.author}
						avatar={item.avatar}
						content={item.content}
						datetime={item.datetime}
					/>
				</li>
			)}
		/>
	</>
)
