import { Avatar, Comment, Tooltip, Form, Button, Spin } from 'antd'
import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { ListVideoComment } from './ListVideoComment'
import TextArea from 'antd/lib/input/TextArea'

const data = [
	{
		author: 'Han Solo',
		avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		content: (
			<p>
				We supply a series of design principles, practical patterns and high
				quality design resources (Sketch and Axure), to help people create their
				product prototypes beautifully and efficiently.
			</p>
		),
		datetime: (
			<Tooltip title="a few second ago">
				<span>a few second ago</span>
			</Tooltip>
		),
	},
	{
		author: 'Han Solo',
		avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		content: <p>Fucking this livestream</p>,
		datetime: (
			<Tooltip title="a few second ago">
				<span>a few second ago</span>
			</Tooltip>
		),
	},
	{
		author: 'Han Solo',
		avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		content: <p>Yeah, fuck this</p>,
		datetime: (
			<Tooltip title="a few second ago">
				<span>a few second ago</span>
			</Tooltip>
		),
	},
	{
		author: 'Han Solo',
		avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		content: <p>Yeah, fuck this</p>,
		datetime: (
			<Tooltip title="a few second ago">
				<span>a few second ago</span>
			</Tooltip>
		),
	},
	{
		author: 'Han Solo',
		avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		content: <p>Yeah, fuck this</p>,
		datetime: (
			<Tooltip title="a few second ago">
				<span>a few second ago</span>
			</Tooltip>
		),
	},
	{
		author: 'Han Solo',
		avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		content: <p>Yeah, fuck this</p>,
		datetime: (
			<Tooltip title="a few second ago">
				<span>a few second ago</span>
			</Tooltip>
		),
	},
	{
		author: 'Han Solo',
		avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		content: <p>Yeah, fuck this</p>,
		datetime: (
			<Tooltip title="a few second ago">
				<span>a few second ago</span>
			</Tooltip>
		),
	},
	{
		author: 'Han Solo',
		avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		content: <p>Yeah, fuck this</p>,
		datetime: (
			<Tooltip title="a few second ago">
				<span>a few second ago</span>
			</Tooltip>
		),
	},
	{
		author: 'Han Solo',
		avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		content: <p>Yeah, fuck this</p>,
		datetime: (
			<Tooltip title="a few second ago">
				<span>a few second ago</span>
			</Tooltip>
		),
	},
	{
		author: 'Han Solo',
		avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		content: <p>Yeah, fuck this</p>,
		datetime: (
			<Tooltip title="a few second ago">
				<span>a few second ago</span>
			</Tooltip>
		),
	},
]

export const InfiniteScrollComment = () => {
	const [comments, addComment] = useState<
		Array<{
			author: string
			content: JSX.Element
			avatar: string
			datetime: JSX.Element
		}>
	>(data)
	const [loading, setLoading] = useState<boolean>(false)
	const [hasMore, setHasMore] = useState<boolean>(true)

	const handleInfiniteOnLoad = async () => {
		setLoading(true)
		addComment([
			...comments,
			{
				author: 'Han Solo',
				avatar:
					'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
				content: <p>Yeah, fuck this</p>,
				datetime: (
					<Tooltip title="a few second ago">
						<span>a few second ago</span>
					</Tooltip>
				),
			},
		])
		setLoading(false)
	}

	return (
		<div className="demo-infinite-container" style={{}}>
			<InfiniteScroll
				initialLoad={false}
				pageStart={0}
				loadMore={handleInfiniteOnLoad}
				hasMore={!loading && hasMore}
				useWindow={false}
				threshold={10}
				loader={
					<div className="demo-loading-container">
						<Spin />
					</div>
				}
			>
				<ListVideoComment data={comments} />
			</InfiniteScroll>
		</div>
	)
}
