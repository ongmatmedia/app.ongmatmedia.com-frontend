import React, { useState, useEffect } from 'react'
import { Form, Modal, Spin, Alert, Input, Icon } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { Bank } from './BankInformationPage'
import { PaymentMethod } from '../../types'
import { update_profile } from '../../graphql/update_profile'

type CreateUpdateBankModalProps = FormComponentProps & {
	visible: boolean
	mode: 'create' | 'update'
	onClose: Function
	banks: PaymentMethod[]
	seletedBank: PaymentMethod
}

export const CreateUpdateBankModal = Form.create<CreateUpdateBankModalProps>()(
	(props: CreateUpdateBankModalProps) => {
		const [loading, set_loading] = useState<boolean>(false)
		const [error, set_error] = useState<string | null>(null)

		const submit = () => {
			props.form.validateFields(async (err, values: PaymentMethod) => {
				if (!err) {
					set_error(null)
					set_loading(true)
					try {
						if (props.mode == 'create') {
							await update_profile({
								payment_methods: [
									...props.banks,
									values
								]
							})
							props.onClose()
						} else {

							props.onClose()
						}
					} catch (message) {
						set_error(message)
					}
					set_loading(false)
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
