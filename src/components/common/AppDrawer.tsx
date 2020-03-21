import { Avatar, Button, Card, Col, Icon, Modal, Row } from 'antd'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { RouteComponentProps } from 'react-router'
import { withRouter } from 'react-router-dom'
import { AppState } from '../../store/App'
import { UserInfo } from './UserInfo'

type DrawerAppProps = {
	name: string
	icon: string
	onClick: Function
}

type DrawerLinksType = {
	name: string
	icon: string
	to: string
}

const DrawerLinks: DrawerLinksType[] = [
	{ name: 'notification_icon_title', icon: 'sound', to: '/notification' },
	{ name: 'seeding_icon_title', icon: 'alert', to: '/seeding' },
	{ name: 'livestream_icon_title', icon: 'video-camera', to: '/livestream' },
	{ name: 'account_icon_title', icon: 'team', to: '/account' },
	{ name: 'deposit_icon_title', icon: 'dollar', to: '/deposit' },
	{ name: 'agency_icon_title', icon: 'user', to: '/agency' },
	{ name: 'setting_icon_title', icon: 'setting', to: '/setting' },
]

const DrawerApp = (props: DrawerAppProps) => (
	<div
		onClick={() => props.onClick()}
		style={{
			width: 80,
			padding: 10,
			display: 'flex',
			flexDirection: 'column',
			marginTop: 15,
			alignItems: 'center',
			cursor: 'pointer',
		}}
		className="drawerItem"
	>
		<Icon type={props.icon} style={{ fontSize: 30 }} />
		<span style={{ fontSize: 12, paddingTop: 15 }}>{props.name}</span>
	</div>
)

export const AppDrawer = ((withRouter as any)(
	(props: RouteComponentProps & { onClick: Function }) => {
		const { t, i18n } = useTranslation('app_drawer')
		const changeLanguage = lng => {
			i18n.changeLanguage(lng)
		}

		return (
			<div
				onClick={() => props.onClick()}
				style={{
					width: 260,
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					padding: 10,
				}}
			>
				<UserInfo
					render={(loading, user) => (
						<Card style={{ width: '100%' }} size="small" loading={loading}>
							<Row type="flex" justify="start" align="middle">
								<Col>
									<Avatar
										src="https://hammockweb.com/slider/img/user.png"
										size={60}
									/>
								</Col>
								<Col style={{ paddingLeft: 20 }}>
									<Row>
										<Col style={{ wordBreak: 'break-all', fontWeight: 'bold' }}>
											{user && user.username}
										</Col>
									</Row>
									<Row>
										<Col
											style={{ color: 'rgb(0, 131, 227)', fontWeight: 'bold' }}
										>
											{user &&
												user.balance.toLocaleString(undefined, {
													maximumFractionDigits: 0,
												})}
											<Icon
												type="dollar"
												style={{
													fontSize: 16,
													verticalAlign: '-0.2em',
													paddingLeft: 3,
													color: 'white',
												}}
											/>
										</Col>
									</Row>
								</Col>
							</Row>
						</Card>
					)}
				/>

				{DrawerLinks.map(app => (
					<DrawerApp
						icon={app.icon}
						name={t(app.name)}
						onClick={() => props.history.push(app.to)}
					/>
				))}
				<DrawerApp
					icon="logout"
					name={t('logout_icon_title')}
					onClick={() =>
						Modal.confirm({
							title: 'Logout now?',
							onOk: () => {
								props.history.push('/auth/login')
								AppState.logout()
							},
						})
					}
				/>
				<div
					style={{
						width: 260,
						marginRight: 10,
						marginTop: 20,
						textAlign: 'center',
					}}
				>
					<Button type="link" onClick={() => changeLanguage('vi')}>
						<Avatar
							size="small"
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/2000px-Flag_of_Vietnam.svg.png"
						/>
					</Button>
					<Button type="link" onClick={() => changeLanguage('en')}>
						<Avatar
							size="small"
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/475px-Flag_of_the_United_States.svg.png"
						/>
					</Button>
					<Button type="link" onClick={() => changeLanguage('th')}>
						<Avatar
							size="small"
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_Thailand.svg/1280px-Flag_of_Thailand.svg.png"
						/>
					</Button>
				</div>
			</div>
		)
	},
) as any) as FunctionComponent<{ onClick: Function }>
