import React, { useState } from 'react'
import { Modal, Form, Input, Radio, Spin } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { AsyncForEach } from '../../helpers/ArrayLoop'
import { FacebookAccount, FacebookAccountInfo } from '../../api/FacebookAccount'
import { add_facebook_account } from '../../relayjs-mutations/add_facebook_account'

export type AccountAddModalProps = FormComponentProps & {
    visible: boolean
    onClose: Function
}


export const AddAccountModal = Form.create<AccountAddModalProps>()((props: AccountAddModalProps) => {

    const { form } = props
    const [loading, set_loading] = useState<boolean>(false)

    const submit = async () => {
        form.validateFields(async (err, values) => {
            if (err) return
            const cookies: string[] = values.cookies.split('\n')
            set_loading(true)
            await AsyncForEach(cookies, async cookie => {
                const fb = await FacebookAccount.getCookieInfo(cookie)
                if (!fb) return
                const { user_id, access_token, name } = fb
                add_facebook_account({
                    id: user_id,
                    cookie,
                    access_token,
                    name
                })
            })

            setTimeout(() => {
                form.resetFields()
                set_loading(false)
                props.onClose()
            }, 2000)
        })
    }

    return (
        <Modal
            visible={props.visible}
            title="Add facebook accounts"
            okText="Import"
            onCancel={() => props.onClose()}
            onOk={() => submit()}
        >
            <Spin spinning={loading}>
                <Form layout="vertical">
                    <Form.Item label="Cookies">
                        {form.getFieldDecorator('cookies', {
                            rules: [{ required: true, message: 'Please input cookies !' }],
                        })(<Input.TextArea rows={5} />)}
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    )
})