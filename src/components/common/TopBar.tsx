import { Avatar, Badge, Icon, Popover } from 'antd'
import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { AppDrawer } from './AppDrawer'
import LogoBold from './logo_bold.png'

const isMobileDevice = () => {
	return (
		navigator.userAgent.indexOf('IEMobile') !== -1 ||
		'ontouchstart' in window ||
		(navigator.msMaxTouchPoints && window.innerWidth < 760)
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
							fontSize: isMobileDevice() ? 37 : 30,
							color: 'white',
							marginRight: 10,
							marginTop: 10,
							cursor: 'pointer',
						}}
						onClick={() => props.history.push('/notification')}
					/>
				</Badge>
				<span
					onClick={() => props.history.push('/user')}
					style={{ marginRight: 10, marginBottom: 10 }}
				>
					<Avatar
						src="https://cdn.vox-cdn.com/thumbor/DMQDbjNM2KllDFePv9NdM2knXvU=/0x0:6720x4480/1200x800/filters:focal(2823x1703:3897x2777)/cdn.vox-cdn.com/uploads/chorus_image/image/66523571/1178141765.jpg.0.jpg"
						style={{
							border: '2px solid white',
							cursor: 'pointer',
							marginBottom: isMobileDevice() ? 7 : 17,
							marginLeft: 7,
							marginRight: 7,
						}}
						size={isMobileDevice() ? 40 : 33}
					/>
				</span>
				<Popover
					placement="bottomRight"
					content={<AppDrawer onClick={() => set_drawer_visible(false)} />}
					visible={drawer_visible}
					trigger="click"
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
