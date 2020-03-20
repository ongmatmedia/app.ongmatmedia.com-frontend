import { Alert, Modal, Spin, Input, Icon } from 'antd'
import Form, { FormComponentProps } from 'antd/lib/form'
import React, { useState } from 'react'
import { InputNumberAutoSelect } from '../../components/InputNumberAutoSelect'
import { User } from '../../types'
import { withForm } from '../../libs/Form'
import { update_price_for_user } from '../../graphql/update_price_for_user'
export type UpdatePriceAgenciesModalProps = {
	visible: boolean
	onClose: Function
	selectedAgencies: Set<User>
}

export const UpdatePriceAgenciesModal = withForm<UpdatePriceAgenciesModalProps>(
	props => {
		const [loading, set_loading] = useState<boolean>(false)
		const [error, set_error] = useState<string | null>(null)

		const submit = async () =>
			props.form.submit(async values => {
				set_loading(true)
				try {
					set_error(null)

					await Promise.all(
						[...props.selectedAgencies].map(agency =>
							update_price_for_user(agency.id, values.price_percent, {
								buff_viewers_livestream: values.buff_viewers_livestream,
								vip_viewers_livestream: values.vip_viewers_livestream,
								livestream: { p1080: 1000, p480: 1000, p720: 1000 },
							}),
						),
					)

					set_loading(false)
					props.onClose()
				} catch (e) {
					set_error(e)
					set_loading(false)
				}
			})

		const user =
			props.selectedAgencies.size == 1
				? [...props.selectedAgencies][0]
				: undefined
		const pricing = user && user.pricing

		return (
			<span>
				<Modal
					title="Update price"
					visible={props.visible}
					onOk={submit}
					onCancel={() => props.onClose()}
				>
					<Spin spinning={loading}>
						{error && <Alert type="error" message={error} />}
						<Form>
							<Form.Item label="Price percent">
								{props.form.field<number>({
									name: 'price_percent',
									require: 'Price percent is required',
									initalValue: user ? user.price_percent : 100,
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
							<Form.Item label="Vip viewers livestream price">
								{props.form.field<number>({
									name: 'vip_viewers_livestream',
									require: 'Vip viewers livestream price is required',
									initalValue: pricing ? pricing.vip_viewers_livestream : 0,
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
									initalValue: pricing ? pricing.buff_viewers_livestream : 0,
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
						</Form>
					</Spin>
				</Modal>
			</span>
		)
	},
)
