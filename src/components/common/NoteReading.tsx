import React, { useState } from 'react'
import Text from 'antd/lib/typography/Text'
import { Col } from 'antd'

export const NoteReading = (props: { note: string, collapse:boolean }) => {
	const [collapsed, setCollapsed] = useState<boolean>(true)

	return (
		<Col
			xs={24}
			style={{
				border: '1px dotted grey',
				padding: 7,
				borderRadius: 5,
				wordBreak: 'break-all',
				marginTop: 10,
				cursor: props.note.length > 35 ? 'pointer' : '',
				fontSize: 13,
				textAlign: 'left',
			}}
			onClick={() => setCollapsed(!collapsed)}
		>
			{props.collapse && props.note.length > 40 ? (
				collapsed ? (
					<>
						<Text>{props.note.substring(0, 40)}</Text>
						<span onClick={() => setCollapsed(false)}> [...]</span>
					</>
				) : (
					<>
						<Text>{props.note}</Text>
					</>
				)
			) : (
				<Text>{props.note}</Text>
			)}
		</Col>
	)
}
