import Alert from 'antd/lib/alert'
import Col from 'antd/lib/col'
import Icon from 'antd/lib/icon'
import Row from 'antd/lib/row'
import Tag from 'antd/lib/tag'
import React, { PropsWithChildren } from 'react'

export type FormItemProps = PropsWithChildren<{
	icon: string
	label: string
	right?: JSX.Element
	require?: boolean
	error?: string
	noMargin?: boolean
}>

export const FormElement = (props: FormItemProps) => (
	<Row style={{ marginBottom: props.noMargin ? 10 : 40 }}>
		<Row type="flex" justify="space-between" align="middle">
			<Col>
				<h3>
					<Icon type={props.icon} />
					&nbsp;
					{props.label}
					&nbsp;
					{props.require && (
						<Tag style={{ background: '#fff', borderStyle: 'dashed' }}>
							Require
						</Tag>
					)}
				</h3>
			</Col>
			<Col>
				<h3>{props.right}</h3>
			</Col>
		</Row>
		<Row>
			<Col>{props.children}</Col>
		</Row>
		{props.error && (
			<Row>
				<Alert type="error" message={props.error} style={{ marginTop: 5 }} />
			</Row>
		)}
	</Row>
)
