import Alert from 'antd/lib/alert'
import Button from 'antd/lib/button'
import Col from 'antd/lib/col'
import Form, { FormComponentProps } from 'antd/lib/form'
import Input from 'antd/lib/input'
import Row from 'antd/lib/row'
import Spin from 'antd/lib/spin'
import React, { useState } from 'react'
import { sleep } from '../../../helpers/utils'

export type FacebookLoginTabProps = FormComponentProps & {}

export const FacebookLoginTab = Form.create<FacebookLoginTabProps>()(
	(props: FacebookLoginTabProps) => {
		const { form } = props
		const [error, setError] = useState<string | null>()
		const [loading, setLoading] = useState<boolean>(false)

		const hasErrors = fieldsError => {
			return Object.keys(fieldsError).some(field => fieldsError[field])
		}

		const handleSubmit = e => {
			e.preventDefault()
			form.validateFields(async (err, values) => {
				if (!err) {
					setError(null)
					try {
						setLoading(true)
						form.resetFields()
						await sleep(2)
						setLoading(false)
					} catch ({ name, message }) {
						setError(`${name}: ${message}`)
					}
				}
			})
		}

		return (
			<Spin spinning={loading}>
				<Form layout="vertical" onSubmit={handleSubmit}>
					<Form.Item label="Username">
						{form.getFieldDecorator('username', {
							rules: [
								{
									required: true,
									message: 'Please input your username!',
								},
							],
							initialValue: '',
						})(<Input placeholder="Facebook username" />)}
					</Form.Item>
					<Form.Item
						label="App Password"
						extra="Just use app password for preventing checkpoint. Be carefully!"
					>
						{form.getFieldDecorator('app_password', {
							rules: [
								{
									required: true,
									message: 'Please input your app password!',
								},
							],
							initialValue: '',
						})(<Input placeholder="App password facebook" />)}
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
							disabled={hasErrors(form.getFieldsError())}
							icon="export"
						>
							Login
						</Button>
					</Form.Item>
				</Form>
			</Spin>
		)
	},
)
