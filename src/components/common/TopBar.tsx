import { Avatar, Badge, Icon, Popover } from 'antd'
import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { withAppState } from '../../store/App'
import { AppDrawer } from './AppDrawer'
import { isMobileDevice } from '../../helpers/utils'

const CurrentUserAvatarTopBar = withAppState(props => (
	<span style={{ marginRight: 10, marginBottom: 10 }}>
		<Avatar
			src={props.appState.currentUser?.picture || ''}
			style={{
				border: '2px solid white',
				marginBottom: isMobileDevice() ? 7 : 17,
				marginLeft: 7,
				marginRight: 7,
			}}
			size={isMobileDevice() ? 40 : 33}
		/>
	</span>
))

export const TopBar = withRouter(props => {
	const [drawer_visible, set_drawer_visible] = useState<boolean>(false)
	const [reactTourIsvisible, setReactTourIsVisible] = useState<boolean>(true)

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
							fontSize: isMobileDevice() ? 37 : 30,
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
							fontSize: isMobileDevice() ? 40 : 30,
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
