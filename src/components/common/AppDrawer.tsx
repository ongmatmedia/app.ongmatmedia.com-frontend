import Avatar from 'antd/lib/avatar'
import Button from 'antd/lib/button'
import Card from 'antd/lib/card'
import Col from 'antd/lib/col'
import Icon from 'antd/lib/icon'
import Modal from 'antd/lib/modal'
import Row from 'antd/lib/row'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { RouteComponentProps } from 'react-router'
import { withRouter } from 'react-router-dom'
import { useAuth0 } from '../../context/Auth0'
import { UserInfo } from './UserInfo'
import './AppDrawer.css'

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
	{
		name: 'seeding_icon_title',
		icon: 'alert',
		to: '/seeding',
	},
	// { name: 'livestream_icon_title', icon: 'video-camera', to: '/livestream' },
	// { name: 'setting_icon_title', icon: 'setting', to: '/setting' },
	{ name: 'account_icon_title', icon: 'team', to: '/farm' },
	{ name: 'smart_group_title', icon: 'solution', to: '/facebook-page-manager' },
	{ name: 'auto_reaction_title', icon: 'robot', to: '/auto-reaction' },
	{ name: 'tool_icon_title', icon: 'tool', to: '/tools' },
	{ name: 'agency_icon_title', icon: 'user', to: '/agency' },
	{ name: 'deposit_icon_title', icon: 'dollar', to: '/deposit' },
	{ name: 'payments_icon_title', icon: 'credit-card', to: '/payments' },
	{ name: 'admin_info_icon_title', icon: 'contacts', to: '/contact' },
]

const CurrentUserAvatarAppDrawer = (props: { loading: boolean }) => {
	const { user } = useAuth0()

	return (
		<span>
			{!props.loading && <Avatar src={user?.picture || ''} size={60} />}
			{props.loading && <Avatar shape="circle" size={60} icon="user" />}
		</span>
	)
}

const DrawerApp = (props: DrawerAppProps) => (
	<div
		onClick={() => props.onClick()}
		style={{
			width: 80,
			marginLeft: 10,
			display: 'flex',
			flexDirection: 'column',
			marginTop: 15,
			alignItems: 'center',
			cursor: 'pointer',
			textAlign: 'center',
		}}
		className={`drawerItem_${props.name}`}
	>
		<Icon type={props.icon} style={{ fontSize: 30 }} />
		<span style={{ fontSize: 12, paddingTop: 15, fontWeight: 'bold' }}>
			{props.name}
		</span>
	</div>
)

export const AppDrawer = ((withRouter as any)(
	(props: RouteComponentProps & { onClick: Function }) => {
		const { t, i18n } = useTranslation('app_drawer')
		const changeLanguage = (lng: string) => {
			i18n.changeLanguage(lng)
		}
		const { logout } = useAuth0()

		return (
			<div
				onClick={() => props.onClick()}
				style={{
					width: 270,
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
				}}
			>
				<UserInfo
					render={(loading, user) => (
						<Card style={{ width: '100%' }} size="small">
							<Row type="flex" justify="start" align="middle">
								<Col>
									<CurrentUserAvatarAppDrawer loading={loading} />
								</Col>
								<Col style={{ paddingLeft: 20 }}>
									<Row>
										{loading && <span>username</span>}
										{!loading && (
											<span>
												{user?.username.length > 25
													? user?.username.substring(0, 22) + '...'
													: user?.username}
											</span>
										)}
									</Row>
									<Row>
										{loading && <span>0.00</span>}
										{!loading && (
											<Col
												style={{
													color: 'rgb(0, 131, 227)',
													fontWeight: 'bold',
												}}
											>
												{user?.balance.toLocaleString(undefined, {
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
										)}
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
							onOk: () =>
								logout({
									returnTo: window.location.origin,
								}),
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
