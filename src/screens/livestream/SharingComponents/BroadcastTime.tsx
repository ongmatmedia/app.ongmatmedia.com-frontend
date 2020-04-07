import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import React from 'react'
import { AddSchedule } from './AddSchedule'

export interface BroadcastTimeProps {
	value: number[]
	onChange: (newBroadcastTime: number[]) => void
	now: boolean
	mode: string
}

export const BroadcastTime = (props: BroadcastTimeProps) => (
	<Row>
		{props.now && (
			<Col span={12}>
				<Row>
					<AddSchedule
						tagsSchedule={props.value || []}
						onChange={props.onChange}
						mode={props.mode}
					/>
				</Row>
			</Col>
		)}
	</Row>
)
