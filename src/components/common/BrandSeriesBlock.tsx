import Avatar from 'antd/lib/avatar'
import Divider from 'antd/lib/divider'
import Icon from 'antd/lib/icon'
import List from 'antd/lib/list'
import Text from 'antd/lib/typography/Text'
import React from 'react'

interface FeatureSeriesBlockProps {
	name: string
	icon?: string
	logo?: string
	component: JSX.Element | Element
}

export const BrandSeriesBlock = (props: {
	data: FeatureSeriesBlockProps[]
}) => {
	return (
		<List
			size="large"
			dataSource={props.data}
			renderItem={item => (
				<>
					<div style={{ marginBottom: 15, fontSize: 25 }}>
						{item.icon ? (
							<Icon type={item.icon} />
						) : (
							<Avatar src={item.logo} shape="square" />
						)}
						<Text strong style={{ marginLeft: 10 }}>
							{item.name.charAt(0).toLocaleUpperCase() +
								item.name.substring(1).toLocaleLowerCase()}
						</Text>
					</div>
					{item.component}
					{props.data.indexOf(item) !== props.data.length - 1 ? (
						<Divider />
					) : (
						<></>
					)}
				</>
			)}
		/>
	)
}
