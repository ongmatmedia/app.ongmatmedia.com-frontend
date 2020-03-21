import { Icon, Popover, Avatar, Badge } from 'antd'
import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { AppDrawer } from './AppDrawer'
import LogoBold from './logo_bold.png'

export const TopBar = withRouter(
	props => {
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
						marginLeft: 10
					}}
				>
					<Link to="/">
						<img
							src={LogoBold}
							style={{
								width: 110,
								height: "auto",
								border: 'none',
							}}
						/>
					</Link>
				</div>
				<div style={{ display: 'flex' }}>
					<Badge count={35} offset={[-17, 15]}>
						<Icon type="bell" style={{ fontSize: 38, color: 'white', marginRight: 10, marginTop: 10, cursor: 'pointer' }} onClick={() => props.history.push('/notification')} />
					</Badge>
					<span onClick={() => props.history.push('/user')} style={{ marginRight: 10, marginBottom: 10 }}>
						<Avatar src="https://cdn.vox-cdn.com/thumbor/DMQDbjNM2KllDFePv9NdM2knXvU=/0x0:6720x4480/1200x800/filters:focal(2823x1703:3897x2777)/cdn.vox-cdn.com/uploads/chorus_image/image/66523571/1178141765.jpg.0.jpg" style={{ border: "2px solid white", cursor: "pointer", marginBottom: 10 }} size={40} />
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
								fontSize: 40,
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
	}

)