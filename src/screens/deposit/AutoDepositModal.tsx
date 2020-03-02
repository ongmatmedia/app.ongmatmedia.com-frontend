import React from 'react'
import { useState } from 'react'
import { Row, Col, Button, Modal, Alert, Spin } from 'antd'
import { InputNumberAutoSelect } from '../../components/InputNumberAutoSelect'
import { NewDepositInfo } from '../../types'
import { create_deposit } from '../../graphql/create_deposit'

export type AutoDepositModalProps = {

}

export const AutoDepositModal = (props: AutoDepositModalProps) => {
    const [visible, set_visible] = useState<boolean>(false)
    const [loading, set_loading] = useState<boolean>(false)
    const [amount, set_amount] = useState<number>(0)
    const [qr, set_qr] = useState<NewDepositInfo | null>()

    const create_deposit_request = async () => {
        if (amount < 10000) return Modal.warn({ content: 'Nạp tối thiểu 10k' })
        set_loading(true)
        set_qr(null)
        try {
            const qr = await create_deposit(amount)
            console.log(qr, qr.qrdata)
            set_qr(qr)
        } catch (e) {
            Modal.error({ content: e })
        }
        set_amount(0)
        set_loading(false)
    }

    const clear = () => {
        set_qr(null)
        set_visible(true)
    } 

    return (
        <Row>
            <Row style={{ marginBottom: 10 }}>
                <Button icon="sync" type="primary" onClick={clear}>Nạp auto</Button>
            </Row>
            <Modal visible={visible} onCancel={() => set_visible(false)} title="Nạp tự động qua QRPAY">
                <Row>Nhập số tiền</Row>
                <Row>
                    <Col span={20}>
                        <InputNumberAutoSelect onChangeValue={set_amount} defaultValue={0} />
                    </Col>
                    <Col span={2}>
                        <Button loading={loading} onClick={create_deposit_request}>Ok</Button>
                    </Col>
                </Row>
                {
                    qr && (
                        <Row style={{ padding: 20 }}>
                            <Row>
                                <Alert type="info" message="Dùng app ngân hàng trên điện thoại quét mã QRcode này hoặc bấm nút dưới để mở app điện thoại" />
                            </Row>
                            <Row style={{ margin: 10 }} type="flex" justify="space-around">
                                <Col>
                                    <img
                                        src={`https://1s71m8djfk.execute-api.us-east-1.amazonaws.com/production/qrcode?data=${qr.qrdata}`}
                                        style={{ width: '100%' }}
                                    />
                                </Col>
                            </Row>
                            <Row type="flex" justify="space-around" style={{ padding: 10 }}>
                                <Col>
                                    <Button
                                        icon="transaction"
                                        type="primary"
                                        onClick={() => window.open(`https://1s71m8djfk.execute-api.us-east-1.amazonaws.com/production/vimo-payment?qrdata=${qr.qrdata}`)}
                                    >Mở app</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Alert type="warning" message="Tiền sẽ được cộng tự động khi thanh toán xong" />
                            </Row>
                        </Row>
                    )
                }
            </Modal>
        </Row >
    )
}