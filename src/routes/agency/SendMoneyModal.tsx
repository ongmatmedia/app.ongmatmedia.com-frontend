import React, { useState, createRef } from 'react'
import { User } from '../../schema/User/User'
import { Modal, Form, InputNumber, Spin, Col, Row, Tag, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { InputProps } from 'antd/lib/input'

export type SendMoneyModalProps = FormComponentProps & {
    visible: boolean
    user: User
    me: User
    onClose: Function
}

const AutoSelectInput = (props: InputProps) => {
    const ref = createRef<{ select: Function }>()
    const select_all_contents = () => {
        ref.current && ref.current.select()
    }
    const Element = (
        <Input
            ref={ref as any}
            {...props}
            onFocus={e => {
                props.onFocus && props.onFocus(e)
                select_all_contents()
            }}
        />
    )
    return Element
}

export const SendMoneyModal = Form.create<SendMoneyModalProps>()((props: SendMoneyModalProps) => {

    const [loading, set_loading] = useState<boolean>(false)

    const [send_amount, set_send_amount] = useState<number>(0)
    const [receive_amount, set_receive_amount] = useState<number>(0)

    const submit = () => {
        props.form.validateFields(async (err, values) => {
            set_loading(true)
            const { amount } = values
            console.log({ amount })
            props.onClose()
            set_loading(false)
        })
    }

    const update_amount = (value: string, is_send_amount: boolean) => {
        if (value == '') {
            set_send_amount(0)
            set_receive_amount(0)
            return
        }
        if (!value.match(/^[0-9\.]+$/)) return
        const amount = Number(value.replace(/\./g, ''))

        if (is_send_amount) {
            set_send_amount(amount)
            const receive_amount = Math.floor((amount * props.user.price_percent / props.me.price_percent))
            set_receive_amount(receive_amount)
        } else {
            const send_amount = Math.ceil(amount * props.me.price_percent / props.user.price_percent)
            set_receive_amount(amount)
            set_send_amount(send_amount)
        }
    }

    return (
        <Modal
            title="Send money"
            visible={props.visible}
            onOk={submit}
            onCancel={() => props.onClose()}
            okButtonProps={{ disabled: send_amount <= 10000 || send_amount > props.me.balance }}
        >
            <Spin spinning={loading}>
                <Row type="flex" justify="start" align="middle" style={{ marginBottom: 5 }}>
                    <Col span={12}>Your user pricing percent</Col>
                    <Col><Tag color="#108ee9">{
                        Number((
                            100 * props.user.price_percent / props.me.price_percent
                        ).toFixed(2))
                    } %</Tag></Col>
                </Row>
                <Row type="flex" justify="start" align="middle" style={{ marginBottom: 5 }}>
                    <Col span={12}>Send Amount</Col>
                    <Col>
                        <AutoSelectInput
                            value={send_amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            onChange={e => update_amount(e.target.value, true)}
                        />
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="middle" style={{ marginBottom: 5 }}>
                    <Col span={12}>Your balance</Col>
                    <Col><Tag color="#108ee9">{(props.me.balance || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })} $</Tag></Col>
                </Row>
                <Row type="flex" justify="start" align="middle" style={{ marginBottom: 5 }}>
                    <Col span={12}>Receive Amount</Col>
                    <Col>
                        <AutoSelectInput
                            value={receive_amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            onChange={e => update_amount(e.target.value, false)}
                        />
                    </Col>
                </Row>
            </Spin>
        </Modal>
    )
})