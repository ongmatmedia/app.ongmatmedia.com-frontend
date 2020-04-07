import Alert from 'antd/lib/alert'
import Button from 'antd/lib/button'
import Card from 'antd/lib/card'
import Form, { FormComponentProps } from 'antd/lib/form'
import Input from 'antd/lib/input'
import notification from 'antd/lib/notification'
import Spin from 'antd/lib/spin'
import graphql from 'babel-plugin-relay/macro'
import React, { useState } from 'react'
import { QueryRenderer } from 'react-relay'
import { BreadCrumb } from '../../components/common/BreadCrumb'
import { RelayEnvironment } from '../../graphql/RelayEnvironment'
import { update_profile } from '../../graphql/update_profile'

type AdminInformationPageProps = FormComponentProps & {}

const query = graphql`
	query AdminInformationPageQuery {
		me {
			id
			name
			phone
			username
			email
			facebook_uid
			admin_page_uid
		}
	}
`

export const AdminInformationPage = Form.create<AdminInformationPageProps>()(
	(props: AdminInformationPageProps) => {
		const [loading, setLoading] = useState<boolean>(false)
		const [error, setError] = useState<string | null>(null)

		const submit = () => {
			props.form.validateFields(async (err, values) => {
				if (!err) {
					setError(null)
					setLoading(true)
					try {
						await update_profile({
							...values,
						})
						notification.success({
							message: 'Update admin information successfully',
						})
					} catch (error) {
						setError(error)
					}
					setLoading(false)
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
			<QueryRenderer
				environment={RelayEnvironment}
				query={query}
				variables={{}}
				render={(rs: any) => (
					<Spin spinning={rs.props == null}>
						<Card title={<BreadCrumb />}>
							{error && <Alert type="error" message={error} />}
							<Form {...formItemLayout}>
								<Form.Item label="Name">
									{props.form.getFieldDecorator('name', {
										rules: [{ required: false }],
										initialValue: rs.props?.me?.name,
									})(<Input placeholder="Name" />)}
								</Form.Item>
								<Form.Item label="Phone">
									{props.form.getFieldDecorator('phone', {
										rules: [{ required: false }],
										initialValue: rs.props?.me?.phone,
									})(<Input placeholder="Phone" />)}
								</Form.Item>
								<Form.Item label="Email">
									{props.form.getFieldDecorator('email', {
										rules: [{ required: false }],
										initialValue: rs.props?.me?.email,
									})(<Input placeholder="Email" />)}
								</Form.Item>
								<Form.Item label="Facebook ID">
									{props.form.getFieldDecorator('facebook_uid', {
										rules: [{ required: false }],
										initialValue: rs.props?.me?.facebook_uid,
									})(<Input placeholder="Facebook ID" />)}
								</Form.Item>
								<Form.Item label="Page ID">
									{props.form.getFieldDecorator('admin_page_uid', {
										rules: [{ required: false }],
										initialValue: rs.props?.me?.admin_page_uid,
									})(<Input placeholder="Page ID" />)}
								</Form.Item>
								<Form.Item {...tailFormItemLayout}>
									<Button type="primary" onClick={submit} loading={loading}>
										Save information
									</Button>
								</Form.Item>
							</Form>
						</Card>
					</Spin>
				)}
			/>
		)
	},
)
