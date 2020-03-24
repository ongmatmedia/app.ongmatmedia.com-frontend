import { Alert, Form, Spin, Card, Button, notification, Icon, Row, Col } from 'antd'
import React, { useState } from 'react'
import { InputNumberAutoSelect } from '../../components/InputNumberAutoSelect'
import { withForm } from '../../libs/Form'
import { BreadCrumb } from '../../components/common/BreadCrumb'
import { update_price_for_user } from '../../graphql/update_price_for_user'
import graphql from 'babel-plugin-relay/macro'
import { QueryRenderer } from 'react-relay'
import { RelayEnvironment } from '../../graphql/RelayEnvironment'

interface SetDefaultPricePageProps { }

const query = graphql`
	query SetDefaultPricePageQuery {
		me {
			id
			default_pricing {
				buff_viewers_livestream
			}
			default_price_percent
		}
	}
`

export const SetDefaultPricePage = withForm<SetDefaultPricePageProps>(props => {
	const [loading, set_loading] = useState<boolean>(false)
	const [error, set_error] = useState<string | null>(null)

	const submit = () =>
		props.form.submit(async values => {
			set_loading(true)
			try {
				set_error(null)
				await update_price_for_user('default', values.price_percent, {
					buff_viewers_livestream: values.buff_viewers_livestream,
					vip_viewers_livestream: 1000,
					livestream: { p1080: 1000, p480: 1000, p720: 1000 },
				})
				notification.success({
					message: 'Update default price successfully',
				})
				set_loading(false)
			} catch (e) {
				set_error(e)
			}
			set_loading(false)
		})

	const formItemLayout = {
		labelCol: {
			xs: { span: 24 },
			sm: { span: 8, offset: 2 },
		},
		wrapperCol: {
			xs: { span: 24 },
			sm: { span: 4 },
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
				offset: 10,
			},
		},
	}

	return (
		<QueryRenderer
			environment={RelayEnvironment}
			query={query}
			variables={{}}
			render={(rs: any) => (
				<>
					{rs.props == null ? (
						<Card title={<BreadCrumb />} style={{ height: '100vh' }}>
							<Row type="flex" justify="space-around">
								<Col>
									<Spin
										indicator={<Icon type="loading" style={{ fontSize: 24 }} />}
									/>
								</Col>
							</Row>
						</Card>
					) : (
							<Card title={<BreadCrumb />}>
								{error && (
									<Alert type="error" message={error} style={{ marginBottom: 15 }} />
								)}
								<Alert
									style={{ marginBottom: 15 }}
									showIcon
									type="info"
									message="You are setting default price for new user. Example: User that logged in via Facebook, Google,..."
								/>
								<Form {...formItemLayout}>
									<Form.Item label="Price percent">
										{props.form.field<number>({
											name: 'price_percent',
											require: 'Price percent is required',
											initalValue: rs.props?.me?.default_price_percent || 100,
											render: ({ value, setValue, error }) => (
												<div>
													<InputNumberAutoSelect
														defaultValue={value}
														onChangeValue={setValue}
													/>
												</div>
											),
										})}
									</Form.Item>
									<Form.Item label="Buff viewers livestream pricing">
										{props.form.field<number>({
											name: 'buff_viewers_livestream',
											require: 'Buff viewers livestream price is required',
											initalValue: rs.props?.me?.default_pricing?.buff_viewers_livestream || 1000,
											render: ({ value, setValue, error }) => (
												<div>
													<InputNumberAutoSelect
														defaultValue={value}
														onChangeValue={setValue}
													/>
												</div>
											),
										})}
									</Form.Item>
									<Form.Item {...tailFormItemLayout}>
										<Button type="primary" onClick={submit} loading={loading}>
											Save prices
									</Button>
									</Form.Item>
								</Form>
							</Card>
						)}
				</>
			)
			}
		/>
	)
}
)
