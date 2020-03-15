import React, { useState } from 'react'
import { Button, Form, Input, Alert } from 'antd'
import FormItem from 'antd/lib/form/FormItem'
import { FormComponentProps } from 'antd/lib/form'
import { Auth } from 'aws-amplify'
import { RouterProps, withRouter } from 'react-router'
import { AppCycleHook } from '../../AppCycleHook'

interface SetNewPasswordPageState {
	err: string | null
	loading: boolean
}

const SetNewPasswordPageView = withRouter<any, any>(
	(props: RouterProps & FormComponentProps) => {
		const data = JSON.parse(
			localStorage.getItem('tmp-user-credential') as string,
		)

		if (!data) props.history.push('/auth/login')

		const [loading, set_loading] = useState<boolean>(false)
		const [err, set_err] = useState<string | null>(null)

		const set_pass = async (
			username: string,
			old_password: string,
			new_password: string,
		) => {
			set_loading(true)
			try {
				const rs = await Auth.signIn(username, old_password)
				if (rs.challengeName == 'NEW_PASSWORD_REQUIRED') {
					await Auth.completeNewPassword(rs, new_password, {})
				}
				await AppCycleHook.onLoginSuccess()
				props.history.push('/')
			} catch (e) {
				console.error('Error login', e)
				set_err(e.message)
			}
			set_loading(false)
		}

		const submit = () => {
			props.form.validateFields(async (err, values) => {
				if (err) return
				if (values.new_password1 != values.new_password2) {
					set_err('2 password not match')
					return
				}
				set_pass(values.username, values.old_password, values.new_password1)
			})
		}

		return (
			<div className="gx-login-container">
				<div className="gx-login-content">
					<div className="gx-login-header gx-text-center">
						<h1 className="gx-login-title">Set a new password</h1>
						{err ? <Alert message={err} type="error" showIcon /> : null}
					</div>
					<Form className="gx-signin-form gx-form-row0">
						<FormItem>
							{props.form.getFieldDecorator('username', {
								rules: [
									{
										required: true,
										message: 'The input is not valid username!',
									},
								],
								initialValue: data.username,
							})(<Input placeholder="Username" disabled />)}
						</FormItem>
						<FormItem>
							{props.form.getFieldDecorator('old_password', {
								rules: [
									{
										required: true,
										message: 'The input is not valid code!',
									},
								],
								initialValue: data.password,
							})(<Input type="password" placeholder="Old password" disabled />)}
						</FormItem>
						<FormItem>
							{props.form.getFieldDecorator('new_password1', {
								rules: [
									{ required: true, message: 'Please input your password!' },
								],
							})(<Input type="password" placeholder="New password" />)}
						</FormItem>
						<FormItem>
							{props.form.getFieldDecorator('new_password2', {
								rules: [
									{ required: true, message: 'Please input your password 2!' },
								],
							})(<Input type="password" placeholder="New password again" />)}
						</FormItem>
						<FormItem>
							<Button type="primary" onClick={() => submit()} loading={loading}>
								Reset password
							</Button>
							<Button
								type="dashed"
								icon="left"
								className="gx-mb-0"
								htmlType="submit"
								onClick={() => {
									props.history.push('/auth/login')
								}}
							>
								Back to login
							</Button>
						</FormItem>
					</Form>
				</div>
			</div>
		)
	},
)

export const SetNewPasswordPage = Form.create()(SetNewPasswordPageView)
