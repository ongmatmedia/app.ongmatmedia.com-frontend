import { Alert, Button, Card, Form, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import React, { useState } from 'react'
import { BreadCrumb } from '../../components/common/BreadCrumb'

type AdminInformationPageProps = FormComponentProps & {}

export const AdminInformationPage = Form.create<AdminInformationPageProps>()(
	(props: AdminInformationPageProps) => {
		const [loading, set_loading] = useState<boolean>(false)
		const [error, set_error] = useState<string | null>(null)
		const { form } = props

		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 8 },
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
					<Form.Item label="Full name">
						{props.form.getFieldDecorator('name', {
							rules: [{ required: true }],
						})(<Input placeholder="Full name" />)}
					</Form.Item>
					<Form.Item label="Phone">
						{props.form.getFieldDecorator('phone', {
							rules: [{ required: true }],
						})(<Input placeholder="Phone" />)}
					</Form.Item>
					<Form.Item label="Email">
						{props.form.getFieldDecorator('email', {
							rules: [{ required: true }],
						})(<Input placeholder="Email" />)}
					</Form.Item>
					<Form.Item label="Facebook ID">
						{props.form.getFieldDecorator('fb_id', {
							rules: [{ required: true }],
						})(<Input placeholder="Facebook ID" />)}
					</Form.Item>
					<Form.Item label="Page ID">
						{props.form.getFieldDecorator('page_id', {
							rules: [{ required: true }],
						})(<Input placeholder="Page ID" />)}
					</Form.Item>
					<Form.Item {...tailFormItemLayout}>
						<Button type="primary" htmlType="submit" loading={loading}>
							Save information
						</Button>
					</Form.Item>
				</Form>
			</Card>
		)
	},
)
