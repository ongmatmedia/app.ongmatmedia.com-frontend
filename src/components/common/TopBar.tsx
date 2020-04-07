import Avatar from 'antd/lib/avatar'
import Badge from 'antd/lib/badge'
import Icon from 'antd/lib/icon'
import Popover from 'antd/lib/popover'
import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useAuth0 } from '../../context/Auth0'
import { isMobileOnly } from 'react-device-detect'
import { AppDrawer } from './AppDrawer'

const CurrentUserAvatarTopBar = () => {
	const { user } = useAuth0()
	return (
		<span style={{ marginRight: 10, marginBottom: 10 }}>
			<Avatar
				src={user?.picture || ''}
				style={{
					border: '2px solid white',
					marginBottom: isMobileOnly ? 7 : 17,
					marginLeft: 7,
					marginRight: 7,
				}}
				size={isMobileOnly ? 40 : 33}
			/>
		</span>
	)
}

export const TopBar = withRouter(props => {
	const [drawer_visible, set_drawer_visible] = useState<boolean>(false)

	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				flexDirection: 'row',
				alignContent: 'center',
				justifyContent: 'space-between',
				height: 55,
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					lineHeight: 55,
					marginLeft: 10,
				}}
			>
				<Link to="/">
					<img
						src="https://ongmatmedia.com/img/logo.png"
						style={{
							width: 45,
							height: 'auto',
							border: 'none',
						}}
					/>
				</Link>
			</div>
			<div style={{ display: 'flex' }}>
				<Badge offset={[-17, 15]}>
					<Icon
						type="bell"
						style={{
							fontSize: isMobileOnly ? 37 : 30,
							color: 'white',
							marginRight: 10,
							marginTop: 10,
							cursor: 'pointer',
						}}
						onClick={() => props.history.push('/notification')}
					/>
				</Badge>
				<CurrentUserAvatarTopBar />
				<Popover
					placement="bottomRight"
					content={<AppDrawer onClick={() => set_drawer_visible(false)} />}
					visible={drawer_visible}
					trigger="click"
					className="app-drawer-toggle"
				>
					<Icon
						type="appstore"
						style={{
							fontSize: isMobileOnly ? 40 : 30,
							color: 'white',
							marginRight: 10,
							marginTop: 10,
						}}
						onClick={() => set_drawer_visible(!drawer_visible)}
					/>
				</Popover>
			</div>
		</div>
	)
})
