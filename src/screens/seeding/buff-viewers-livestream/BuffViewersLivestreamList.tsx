import {
	Avatar,
	Col,
	Icon,
	message,
	Modal,
	notification,
	Row,
	Table,
	Tag,
} from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { graphql } from 'babel-plugin-relay/macro'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Moment from 'react-moment'
import {
	BuffViewersLivestream,
	BuffViewersLivestreamConnection,
} from '../../../types'
import { delete_buff_viewers_livestream } from '../../../graphql/delete_buff_viewers_livestream'
import { GraphQLWrapper } from '../../../graphql/GraphQLWrapper'

const query = graphql`
	query BuffViewersLivestreamListQuery {
		buff_viewers_livestream_tasks {
			edges {
				node {
					id
					uid
					amount
					note
					name
					created_time
				}
			}
		}
	}
`

const IconFont = Icon.createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
})

const columns: ColumnProps<BuffViewersLivestream>[] = [
	{
		title: 'Info',
		key: 'uid',
		align: 'center',
		render: (item: BuffViewersLivestream) => (
			<Row type="flex" align="middle" justify="space-between">
				<Col xs={24} md={4} xl={2} xxl={2}>
					<Row type="flex" justify="space-around">
						<Col>
							<Avatar
								src={`http://graph.facebook.com/${item.uid}/picture?type=large`}
								size={60}
							/>
						</Col>
					</Row>
				</Col>
				<Col>
					<Row type="flex" justify="space-around">
						{' '}
						<Col style={{ minWidth: 300, paddingBottom: 10, paddingTop: 10 }}>
							<Tag color="#2db7f5">
								<Moment format="DD/MM/YYYY H:mm">{item.created_time}</Moment>
							</Tag>
							<Tag color="#108ee9">
								<Moment toNow>{item.created_time}</Moment>
							</Tag>
							<CopyToClipboard
								text={item.uid}
								onCopy={() => message.info('Video owner UID copied')}
							>
								<Tag color="#108ee9">
									<span>{item.uid}</span> &nbsp;
									<Icon type="copy" />
								</Tag>
							</CopyToClipboard>
						</Col>
					</Row>
				</Col>
				<Col style={{ maxWidth: 300 }}>{item.name}</Col>
			</Row>
		),
	},
	{
		title: 'Action',
		key: 'address',
		align: 'center',
		render: (item: BuffViewersLivestream) => (
			<Row align="middle">
				<Col>
					<Icon
						type="video-camera"
						style={{
							color: 'black',
							margin: 10,
							fontSize: 20,
							cursor: 'pointer',
						}}
						onClick={() => window.open(`https://fb.com/${item.id}`)}
					/>
					<Icon
						type="message"
						style={{
							color: 'black',
							margin: 10,
							fontSize: 20,
							cursor: 'pointer',
						}}
						onClick={() => window.open(`https://m.me/${item.uid}`)}
					/>
					<IconFont
						type="icon-facebook"
						style={{
							color: 'black',
							margin: 10,
							fontSize: 20,
							cursor: 'pointer',
						}}
						onClick={() => window.open(`https://fb.com/${item.uid}`)}
					/>
					<Icon
						type="delete"
						style={{
							color: 'red',
							margin: 10,
							fontSize: 20,
							cursor: 'pointer',
						}}
						onClick={() =>
							Modal.confirm({
								title: 'Confirm!',
								content: (
									<span>
										Delete <span style={{ color: 'red' }}> {item.name}</span> ?
									</span>
								),
								onOk: async () => {
									try {
										await delete_buff_viewers_livestream(item.id)
										notification.success({ message: 'Success' })
									} catch (e) {
										notification.error({ message: e })
									}
								},
							})
						}
					/>
				</Col>
			</Row>
		),
	},
]

export const BuffViewersLivestreamList = GraphQLWrapper<{
	buff_viewers_livestream_tasks: BuffViewersLivestreamConnection
}>(query, {}, ({ data, loading }) => (
	<Table
		loading={loading}
		columns={columns}
		dataSource={
			data ? data.buff_viewers_livestream_tasks.edges.map(e => e.node) : []
		}
	/>
))
