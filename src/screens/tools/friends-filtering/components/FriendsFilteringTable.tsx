import
{
	Alert,
	Avatar,
	Button,
	Col,
	Icon,
	Progress,
	Row,
	Table,
	Tag,
} from 'antd'
import {ColumnProps} from 'antd/lib/table'
import React from 'react'
import {Friend} from '../../../../libs/filter-friends/FBFriend'
import {withFilterFriendsStore} from '../../../../libs/filter-friends/store'
import {isMobileOnly, isTablet} from 'react-device-detect'

export const FriendsFilteringTable = withFilterFriendsStore(props =>
{
	const columns: ColumnProps<Friend>[] = [
		{
			title: 'Name',
			key: 'name',
			render: (d: Friend) => d.name,
			sorter: (a: Friend, b: Friend) => a.name.localeCompare(b.name),
			fixed: 'left',
			width: 100,
		},
		{
			title: 'UID',
			key: 'id',
			render: (d: Friend) => (
				<Row
					align="middle"
					style={{textAlign: 'center', cursor: 'pointer'}}
					onClick={() => window.open(`https://fb.com/${d.uid}`, '_blank')}
				>
					<Col>
						<Avatar
							src={`https://graph.facebook.com/${d.uid}/picture?type=large`}
							size={40}
						/>
					</Col>
					<Col style={{fontWeight: 'bold'}}>{d.uid}</Col>
				</Row>
			),
			sorter: (a: Friend, b: Friend) => a.uid.localeCompare(b.uid),
			filteredValue: [props.store?.search_name],
			onFilter: (value, record) =>
				record.name.toLowerCase().includes(value.toLowerCase()),
		},
		{
			title: 'Mutual friends',
			key: 'mutual_friends',
			render: (d: Friend) => d.mutual_friends,
			sorter: (a: Friend, b: Friend) => a.mutual_friends - b.mutual_friends,
		},
		{
			title: 'Friend count',
			key: 'friend_count',
			render: (d: Friend) => d.friend_count && <Tag color="blue">{d.friend_count}</Tag>,
			sorter: (a: Friend, b: Friend) => a.friend_count - b.friend_count
		},
		{
			title: 'Reactions',
			key: 'reactions',
			render: (d: Friend) => d.reactions > 0 && <Tag color="purple">{d.reactions}</Tag>,
			sorter: (a: Friend, b: Friend) => a.reactions - b.reactions
		},
		{
			title: 'Comment',
			key: 'comment',
			render: (d: Friend) => d.comment > 0 && <Tag color="#2db7f5">{d.comment}</Tag>,
			sorter: (a: Friend, b: Friend) => a.comment - b.comment
		},
		{
			title: 'Inbox',
			key: 'inbox',
			render: (d: Friend) => d.inbox > 0 && <Tag color="#108ee9">{d.inbox}</Tag>,
			sorter: (a: Friend, b: Friend) => a.inbox - b.inbox
		},
		{
			title: 'Score',
			key: 'score',
			render: (f: Friend) => (
				<Tag color="#8022b1">
					{f.comment * 200 + f.inbox + f.reactions * 100}
				</Tag>
			),
			sorter: (a: Friend, b: Friend) =>
				b.comment * 200 +
				b.inbox +
				b.reactions * 100 -
				a.comment * 200 -
				a.inbox -
				a.reactions * 100,
			filters: [
				0,
				1,
				2,
				3,
				5,
				10,
				20,
				30,
				50,
				100,
				200,
				300,
				500,
				1000,
				2000,
				3000,
				5000,
				10000,
				20000,
				30000,
				50000,
			].map(n => ({text: `<= ${n}`, value: `${n}`})),
			filterMultiple: false,
			onFilter: (v, f: Friend) =>
				f.comment * 200 + f.inbox + f.reactions * 100 <= v,
		},
		{
			title: 'Action',
			key: 'action',
			render: (f: Friend) => (
				<Button
					onClick={() => props.store.delete_friend(f)}
					type="danger"
					icon="close"
				>
					{' '}
					Unfriend
				</Button>
			),
			fixed: 'right',
			width: 100,
		},
	]

	return (
		<span style={{lineHeight: '2em'}}>
			{props.store.loading_status && (
				<Row>
					<Col style={{textAlign: 'center'}}>
						<Icon type="sync" spin /> Loading
					</Col>
					<Col>
						<Progress percent={props.store.loading_percent} status="active" />
					</Col>
				</Row>
			)}
			{props.store.deleted_friend && (
				<Row style={{marginBottom: 10}}>
					<Col>
						<Alert
							message={`Hủy kết bạn ${props.store.deleted_friend.name} thành công`}
							type="success"
							showIcon
						/>
					</Col>
				</Row>
			)}
			<Table
				pagination={{
					showSizeChanger: true,
					pageSizeOptions: [
						'10',
						'20',
						'50',
						'100',
						'200',
						'300',
						'400',
						'500',
						'600',
						'700',
						'800',
						'900',
						'1000',
						'1100',
						'1200',
						'1300',
						'1400',
						'1500',
						'2000',
						'2500',
						'3000',
						'3500',
						'4000',
						'4500',
						'5000',
					],
					position: 'bottom',
				}}
				dataSource={Array.from(props.store.friends.values())}
				columns={columns}
				loading={props.store.loading_status != null}
				rowSelection={{
					onChange: (selectedRowKeys, selectedRows) =>
					{
						props.store.selected_friends = selectedRows
					},
				}}
				rowKey="uid"
				scroll={{x: 'max-content', scrollToFirstRowOnChange: true}}
			/>
		</span>
	)
})
