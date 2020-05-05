import Col from 'antd/lib/col'
import Text from 'antd/lib/typography/Text'
import React, { useState } from 'react'

export const NoteReading = (props: { note: string; collapse: boolean }) => {
	const [collapsed, setCollapsed] = useState<boolean>(true)

	return (
		<Col
			xs={24}
			style={{
				border: '1px dotted grey',
				padding: 7,
				borderRadius: 5,
				wordBreak: 'break-all',
				marginTop: 20,
				cursor: props.note.length > 35 ? 'pointer' : '',
				fontSize: 13,
				textAlign: 'left',
				minHeight: 80,
				overflowY: 'auto',
			}}
			onClick={() => setCollapsed(!collapsed)}
		>
			{props.collapse && props.note.length > 100 ? (
				collapsed ? (
					<>
						<Text>{props.note.substring(0, 100)}</Text>
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