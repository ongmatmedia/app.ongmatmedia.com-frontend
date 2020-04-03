import { Alert, Button, Card, Form, Input, Row, Col } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import React, { useState } from 'react'
import { BreadCrumb } from '../../components/common/BreadCrumb'

type CollaboratorSettingsPageProps = FormComponentProps & {}

const GradientPallete = (props: { onChange?: Function; value?: any }) => {
	const gradientData: string[] = [
		'linear-gradient(to right, rgb(189, 195, 199), rgb(44, 62, 80))',
		'linear-gradient(to right, rgb(238, 156, 167), rgb(255, 221, 225))',
		'linear-gradient(to right, rgb(33, 147, 176), rgb(109, 213, 237))',
		'linear-gradient(to right, rgb(198, 255, 221), rgb(251, 215, 134), rgb(247, 121, 125))',
	]

	return (
		<Row>
			{gradientData.map((color, index) => (
				<Col
					xs={12}
					style={{
						width: 50,
						background: `${color}`,
						textAlign: 'center',
						border: color == props.value ? '1px solid blue' : '',
						marginLeft: 5,
					}}
					onClick={() => props.onChange && props.onChange(color)}
				>{`#${index}`}</Col>
			))}
		</Row>
	)
}

export const CollaboratorSettingsPage = Form.create<
	CollaboratorSettingsPageProps
>()((props: CollaboratorSettingsPageProps) => {
	const [loading, set_loading] = useState<boolean>(false)
	const [error, set_error] = useState<string | null>(null)
	const { form } = props

	const submit = () => {
		props.form.validateFields(async (err, values) => {
			if (!err) {
				console.log(values)
			}
		})
	}

	const formItemLayout = {
		labelCol: {
			xs: { span: 24 },
			sm: { span: 8 },
		},
		wrapperCol: {
			xs: { span: 24 },
			sm: { span: 12 },
		},
	}
	const tailFormItemLayout = {
		wrapperCol: {
			xs: {
				span: 24,
				offset: 0,
			},
			sm: {
				span: 16,
				offset: 8,
			},
		},
	}

	return (
		<Card title={<BreadCrumb />}>
			{error && <Alert type="error" message={error} />}
			<Form {...formItemLayout}>
				<Form.Item label="Topbar Color">
					{props.form.getFieldDecorator('topbar_color', {
						rules: [{ required: true }],
					})(<GradientPallete />)}
				</Form.Item>
				<Form.Item label="Site title">
					{props.form.getFieldDecorator('title', {
						rules: [{ required: true }],
					})(<Input placeholder="Site title" />)}
				</Form.Item>
				<Form.Item label="Logo">
					{props.form.getFieldDecorator('logo', {
						rules: [
							{
								required: true,
								pattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g,
								message: "'Logo's url is invalid",
							},
						],
					})(<Input placeholder="Logo URL" />)}
				</Form.Item>
				<Form.Item label="Icon">
					{props.form.getFieldDecorator('icon', {
						rules: [
							{
								required: true,
								pattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g,
								message: "'Icon's url is invalid",
							},
						],
					})(<Input placeholder="Icon URL" />)}
				</Form.Item>
				<Form.Item {...tailFormItemLayout}>
					<Button type="primary" loading={loading} onClick={submit}>
						Save settings
					</Button>
				</Form.Item>
			</Form>
		</Card>
	)
})
