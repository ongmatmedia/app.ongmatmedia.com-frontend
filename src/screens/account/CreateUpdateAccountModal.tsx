import { Form, Input, Modal, Spin } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import React, { useState } from 'react'
import { sleep } from '../../helpers/utils'

export type UpdateAccountModalProps = FormComponentProps & {
	visible: boolean
	onClose: Function
	accountId: string
	mode: 'create' | 'update'
}

export const CreateUpdateAccountModal = Form.create<UpdateAccountModalProps>()(
	(props: UpdateAccountModalProps) => {
		const { form } = props
		const [loading, set_loading] = useState<boolean>(false)
		console.log({ props })

		const submit = async () => {
			form.validateFields(async (err, values) => {
				if (err) return
				set_loading(true)
				console.log({ values })
				// Perform an asynchorounous operation
				if (props.mode === 'create') {
				} else if (props.mode === 'update') {
				}
				await sleep(2)
				// End asynchorounous operation
				form.resetFields()
				set_loading(false)
				props.onClose()
			})
		}

		return (
			<Modal
				visible={props.visible}
				title="Update Account information"
				okText="Save account"
				onCancel={() => props.onClose()}
				onOk={() => submit()}
			>
				<Spin spinning={loading}>
					<Form layout="vertical">
						<Form.Item label="Data">
							{form.getFieldDecorator('data', {
								rules: [
									{
										required: true,
										message:
											'Please input your data (cookies,access token,etc) !',
									},
								],
								initialValue: props.mode === 'update' ? props.accountId : '',
							})(<Input.TextArea rows={5} />)}
						</Form.Item>
					</Form>
				</Spin>
			</Modal>
		)
	},
)
