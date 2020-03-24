import React, { useState, FunctionComponent } from 'react'
import { Button, Checkbox, Form, Icon, Input, Alert, Modal, Avatar } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { Auth } from 'aws-amplify'
import { RouterProps, withRouter, RouteComponentProps } from 'react-router'
import { AppState } from '../../store/App'

export const LoginView = withRouter<any, any>(
	(props: FormComponentProps & RouteComponentProps) => {
		const [error, set_error] = useState<string | null>(null)
		const [loading, set_loading] = useState<boolean>(false)

		const { form } = props

		const set_new_pass_prompt = (username: string, password: string) =>
			Modal.confirm({
				title: 'New password require',
				content:
					'You must set a new password for your account, do you want to do it now ?',
				onOk: () => {
					localStorage.setItem(
						'tmp-user-credential',
						JSON.stringify({ username, password }),
					)
					props.history.push(`/auth/set-new-password`)
				},
			})

		const reset_password_prompt = (username: string) => {
			Modal.confirm({
				title: 'Password reset require',
				content:
					'You must set a new password for your account, do you want to do it now ?',
				onOk: () =>
					props.history.push(`/auth/reset-password?username=${username}`),
			})
		}

		const login = async () => {
			form.validateFields(async (err, values) => {
				if (err) return

				set_loading(true)
				set_error(null)

				const { password, username } = values
				try {
					const user = await Auth.signIn({ password, username })

					if (user.challengeName) {
						if (user.challengeName == 'NEW_PASSWORD_REQUIRED')
							set_new_pass_prompt(username, password)
					}
					AppState.on_login_success()
					props.history.push(localStorage.getItem('login_redirect') || '/')
				} catch (e) {
					set_error(e.message)
					set_loading(false)
					e.code == 'PasswordResetRequiredException' &&
						reset_password_prompt(username)
				}
			})
		}

		return (
			<Form id="auth-form">
				<h1 style={{ textAlign: 'center' }}>Login</h1>

				{error && <Alert message={error} type="error" showIcon />}

				<Form.Item style={{ marginTop: 20 }}>
					{form.getFieldDecorator('username', {
						rules: [{ required: true, message: 'Please input your username!' }],
					})(
						<Input
							prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="Username"
							size="large"
						/>,
					)}
				</Form.Item>
				<Form.Item>
					{form.getFieldDecorator('password', {
						rules: [{ required: true, message: 'Please input your Password!' }],
					})(
						<Input
							prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
							type="password"
							placeholder="Password"
							size="large"
						/>,
					)}
				</Form.Item>

				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						flexDirection: 'column',
					}}
				>
					<Button
						type="default"
						block
						size="large"
						onClick={() => login()}
						loading={loading}
					>
						{' '}
						Login
					</Button>
					<Button
						icon="google-plus"
						type="danger"
						block
						size="large"
						style={{ marginTop: 15 }}
					>
						Google+
					</Button>
					<Button
						icon="facebook"
						type="primary"
						block
						size="large"
						style={{ marginTop: 15 }}
					>
						Facebook
					</Button>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-around',
							marginTop: 40,
						}}
					>
						<Button
							type="dashed"
							onClick={() => props.history.push('/auth/reset-password')}
						>
							Forgot password
						</Button>
						<Button
							type="dashed"
							onClick={() =>
								Modal.warn({
									title: 'Developing feature',
								})
							}
						>
							Register
						</Button>
					</div>
				</div>
			</Form>
		)
	},
)

export const Login = Form.create()(LoginView)
