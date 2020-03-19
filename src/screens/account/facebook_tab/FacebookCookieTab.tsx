import React, { useState } from 'react'
import Form, { FormComponentProps } from 'antd/lib/form'
import { sleep } from '../../../helpers/utils'
import { Spin, Input, Row, Col, Alert, Button, notification } from 'antd'
import { add_facebook_account } from '../../../graphql/add_facebook_account'

export type FacebookCookieTabProps = FormComponentProps & {
	onCloseModal: Function
}

export const FacebookCookieTab = Form.create<FacebookCookieTabProps>()(
	(props: FacebookCookieTabProps) => {
		const { form } = props
		const [error, setError] = useState<string | null>()
		const [loading, setLoading] = useState<boolean>(false)

		const hasErrors = fieldsError => {
			return Object.keys(fieldsError).some(field => fieldsError[field])
		}

		const handleSubmit = e => {
			e.preventDefault()
			form.validateFields(async (err, values) => {
				setLoading(true)
				if (!err) {
					setError(null)
					console.log('Received values of form: ', values)
					try {
						await add_facebook_account(values)
						form.resetFields()
						props.onCloseModal()
						notification.success({
							message: `Operation: Add account`,
							description: 'Successfully',
						})
					} catch ({ errors }) {
						setError(errors[0].message)
					}
				}
				setLoading(false)
			})
		}

		return (
			<Form layout="vertical" onSubmit={handleSubmit}>
				<Form.Item label="Faceook Cookie">
					{form.getFieldDecorator('cookie', {
						rules: [
							{
								required: true,
								message: 'Please input your cookie!',
							},
						],
						initialValue: '',
					})(<Input.TextArea rows={5} placeholder="Facebook Cookie" />)}
				</Form.Item>
				{error && (
					<Row>
						<Col xs={24}>
							<Alert
								message={error}
								type="error"
								showIcon
								style={{ marginBottom: 10 }}
							/>
						</Col>
					</Row>
				)}
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						icon="key"
						loading={loading}
						disabled={hasErrors(form.getFieldsError())}
					>
						Save cookie
					</Button>
				</Form.Item>
			</Form>
		)
	},
)
