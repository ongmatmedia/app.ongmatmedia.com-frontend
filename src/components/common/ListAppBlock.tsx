import Avatar from 'antd/lib/avatar'
import Card from 'antd/lib/card'
import Icon from 'antd/lib/icon'
import List from 'antd/lib/list'
import Row from 'antd/lib/row'
import React from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { BreadCrumb } from './BreadCrumb'

export const ListAppBlock = (withRouter as any)(
	(
		props: {
			children: Array<{
				icon?: string
				cover?: string
				serviceName: string
				link: string
			}>
		} & RouteComponentProps,
	) => {
		return (
			<Card style={{ minHeight: '100%' }} title={<BreadCrumb />}>
				<List
					grid={{
						gutter: 24,
						xs: 2,
						sm: 3,
						md: 4,
					}}
					dataSource={props.children}
					renderItem={item => (
						<List.Item>
							<Link
								to={`${
									props.location.pathname[props.location.pathname.length - 1] ==
									'/'
										? props.location.pathname.slice(
												0,
												props.location.pathname.length - 1,
										  )
										: props.location.pathname
								}${item.link}`}
							>
								<Card
									style={{
										textAlign: 'center',
										backgroundColor: 'white',
										borderRadius: 10,
										boxShadow:
											'0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 6px 5px 0 rgba(0, 0, 0, 0.05)',
										paddingTop: 15,
									}}
									bodyStyle={{ minHeight: 150 }}
								>
									<Row style={{ marginBottom: 15 }}>
										{item.cover ? (
											<Avatar src={item.cover} size={40} />
										) : (
											<Icon type={item.icon} style={{ fontSize: 40 }} />
										)}
									</Row>
									<Row>
										{item.serviceName.charAt(0).toLocaleUpperCase() +
											item.serviceName.substring(1).toLocaleLowerCase()}
									</Row>
								</Card>
							</Link>
						</List.Item>
					)}
				/>
			</Card>
		)
	},
)
