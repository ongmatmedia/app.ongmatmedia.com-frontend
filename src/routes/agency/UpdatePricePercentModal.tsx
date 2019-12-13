import React, { useState } from 'react'
import { Modal, Row, Col, Spin, Alert } from 'antd'
import { AutoSelectInput } from '../../components/AutoSelectInput'
import { update_price_percent } from '../../relayjs-mutations/update_price_percent'
import { User } from '../../schema/User/User'

export interface UpdatePricePercentModalProps {
    visible: boolean
    onClose: Function
    me: User
    user: User
}

export const UpdatePricePercentModal = (props: UpdatePricePercentModalProps) => {
    const [value, set_value] = useState<number>(props.user.price_percent / props.me.price_percent * 100)
    const [loading, set_loading] = useState<boolean>(false)
    const [error, set_error] = useState<string | null>(null)

    const submit = async () => {
        set_loading(true)
        set_error(null)
        try {
            await update_price_percent(props.user.id, value, props.me.price_percent)
            set_loading(false)
            props.onClose()
        } catch (e) {
            console.log(e)
            set_error(e.message)
            set_loading(false)
        }
    }

    return (
        <Modal
            visible={props.visible}
            title="Update price percent"
            onCancel={() => props.onClose()}
            onOk={() => submit()}
            okButtonProps={{ loading }}
        >
            {
                error && <Alert type="error" message={error} />
            }
            <Row>
                <Alert showIcon style={{margin: 10}} type="error" message="Change user price percent result CHANGE USER BALANCE" />
                <Col span={12}>New price percent</Col>
                <Col span={12}>
                    <AutoSelectInput
                        value={value}
                        onChange={e => Number(e.target.value) != NaN && set_value(Number(e.target.value))}
                    />
                </Col>
            </Row>
        </Modal>
    )
}