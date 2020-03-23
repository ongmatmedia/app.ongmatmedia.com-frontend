import { Alert, Form, Input, Modal, notification, Spin } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import React, { useState } from 'react'
import { update_profile } from '../../graphql/update_profile'
import { PaymentMethod } from '../../types'

type CreateUpdateBankModalProps = FormComponentProps & {
	visible: boolean
	mode: 'create' | 'update'
	onClose: Function
	paymentMethods: PaymentMethod[]
	seletedBank: PaymentMethod
}

export const CreateUpdateBankModal = Form.create<CreateUpdateBankModalProps>()(
	(props: CreateUpdateBankModalProps) => {
		const [loading, setLoading] = useState<boolean>(false)
		const [error, setError] = useState<string | null>(null)

		const submit = () => {
			props.form.validateFields(async (err, values: PaymentMethod) => {
				if (!err) {
					setError(null)
					setLoading(true)
					try {
						if (props.mode == 'create') {
							await update_profile({
								payment_methods: [
									...props.paymentMethods,
									values
								]
							})
							props.onClose()
						} else {
							await update_profile({
								payment_methods: [
									...props.paymentMethods.filter(paymentMethod => paymentMethod.account !== values.account),
									values
								]
							})
							notification.success({
								message: 'Add bank successfully'
							})
							props.onClose()
						}
					} catch (error) {
						setError(error)
					}
					setLoading(false)
				}
			})
		}

		return (
			<Modal
				title={
					props.mode == 'create' ? 'Create a bank' : 'Update bank information'
				}
				visible={props.visible}
				onOk={submit}
				onCancel={() => props.onClose()}
			>
				<Spin spinning={loading}>
					{error && <Alert type="error" message={error} />}
					<Form>
						<Form.Item label="Bank name">
							{props.form.getFieldDecorator('name', {
								rules: [{ required: true }],
								initialValue: props.seletedBank ? props.seletedBank.name : '',
							})(<Input placeholder="Bank name" />)}
						</Form.Item>
						<Form.Item label="Owner">
							{props.form.getFieldDecorator('owner', {
								rules: [{ required: true }],
								initialValue: props.seletedBank ? props.seletedBank.owner : '',
							})(<Input placeholder="Owner's name" />)}
						</Form.Item>
						<Form.Item label="Account number">
							{props.form.getFieldDecorator('account', {
								rules: [{ required: true }],
								initialValue: props.seletedBank ? props.seletedBank.account : '',
							})(<Input placeholder="Account number" />)}
						</Form.Item>
						<Form.Item label="Transaction description">
							{props.form.getFieldDecorator('description', {
								rules: [{ required: true }],
								initialValue: props.seletedBank ? props.seletedBank.description : '',
							})(<Input placeholder="Transaction description" />)}
						</Form.Item>
					</Form>
				</Spin>
			</Modal>
		)
	},
)
