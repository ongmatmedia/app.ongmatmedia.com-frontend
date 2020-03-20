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
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Moment from 'react-moment'
import { BuffViewersLivestream } from '../../../types'
import { delete_buff_viewers_livestream } from '../../../graphql/delete_buff_viewers_livestream'

interface BuffViewersData {
	uid: string
	title: string
	video_id: string
	created: number
	amount: number
	done_amount: number
	thumbnail: string
	description: string
}

const fakeData: Array<BuffViewersData> = [
	{
		uid: '123456789',
		title: 'Video title',
		video_id: '1234567899',
		created: 123456789,
		amount: 123456789,
		done_amount: 10000000,
		thumbnail: 'https://i.ytimg.com/vi/VTd5kQhtih8/hqdefault.jpg',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
	},
	{
		uid: '123456789',
		title: 'Video title',
		video_id: '1234567899',
		created: 123456789,
		amount: 123456789,
		done_amount: 123,
		thumbnail: 'https://i.ytimg.com/vi/VTd5kQhtih8/hqdefault.jpg',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
	},
	{
		uid: '123456789',
		title: 'Video title',
		video_id: '1234567899',
		created: 123456789,
		amount: 123456789,
		done_amount: 123,
		thumbnail: 'https://i.ytimg.com/vi/VTd5kQhtih8/hqdefault.jpg',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
	},
	{
		uid: '123456789',
		title: 'Video title',
		video_id: '1234567899',
		created: 123456789,
		amount: 123456789,
		done_amount: 123,
		thumbnail: 'https://i.ytimg.com/vi/VTd5kQhtih8/hqdefault.jpg',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
	},
]

const IconFont = Icon.createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
})

const TagCustom = props => (
	<Tag color={props.color} style={{ marginTop: 10, paddingLeft: 10 }}>
		{props.children}
	</Tag>
)

const columns: ColumnProps<BuffViewersData>[] = [
	{
		title: 'Info',
		key: 'uid',
		align: 'center',
		render: (item: BuffViewersData) => (
			<Row type="flex" align="middle" justify="space-between">
				<Col xs={24} md={3}>
					<Row type="flex" justify="space-around">
						<Row>
							<Col>
								<Avatar shape="square" size={80} src={item.thumbnail} />
							</Col>
						</Row>
						<Row>
							<span style={{ fontSize: 20 }}>{item.title}</span>
						</Row>
					</Row>
				</Col>
				<Col xs={24} md={10} style={{ marginBottom: 10 }}>
					<Row>
						<Col span={12}>
							<TagCustom color="#2db7f5">
								<Moment format="DD/MM/YYYY H:mm">{item.created}</Moment>
							</TagCustom>
						</Col>
						<Col span={12}>
							<TagCustom color="#108ee9">
								<Moment toNow>{item.created}</Moment>
							</TagCustom>
						</Col>
						<Col span={12}>
							<CopyToClipboard
								text={item.uid}
								onCopy={() => message.info('Video owner UID copied')}
							>
								<TagCustom color="#108ee9">
									<span>{item.uid}</span> &nbsp;
									<Icon type="copy" />
								</TagCustom>
							</CopyToClipboard>
						</Col>
						<Col span={12}>
							{item.done_amount < item.amount ? (
								<TagCustom>
									<Icon type="loading" />{' '}
									{item.done_amount.toLocaleString(undefined)}/
									{item.amount.toLocaleString(undefined)}
								</TagCustom>
							) : (
								<TagCustom color="green">
									<Icon type="check" />{' '}
									{item.done_amount.toLocaleString(undefined)}/
									{item.amount.toLocaleString(undefined)}
								</TagCustom>
							)}
						</Col>
					</Row>
				</Col>
				<Col style={{ maxWidth: 300, textAlign: 'left' }}>
					{item.description}
				</Col>
			</Row>
		),
	},
	{
		title: 'Action',
		key: 'address',
		align: 'center',
		render: (item: BuffViewersLivestream) => (
			<Row align="middle" style={{ marginLeft: 15 }}>
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

export const BuffViewersList = () => (
	<Table columns={columns} dataSource={fakeData} />
)
