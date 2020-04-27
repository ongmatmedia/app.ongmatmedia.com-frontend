import Alert from 'antd/lib/alert'
import Button from 'antd/lib/button'
import Col from 'antd/lib/col'
import Modal from 'antd/lib/modal'
import Row from 'antd/lib/row'
import React, { Fragment, useState } from 'react'
import { InputNumberAutoSelect } from '../../components/InputNumberAutoSelect'
import { create_deposit } from '../../graphql/create_deposit'
import { NewDepositInfo } from '../../types'

export type AutoDepositModalProps = {}

export const AutoDepositModal = (props: AutoDepositModalProps) => {
	const [loading, set_loading] = useState<boolean>(false)
	const [amount, set_amount] = useState<number>(0)
	const [qr, set_qr] = useState<NewDepositInfo | null>()

	const create_deposit_request = async () => {
		if (amount < 10000) return Modal.warn({ content: 'Nạp tối thiểu 10k' })
		set_loading(true)
		set_qr(null)
		try {
			const qr = await create_deposit(amount)
			set_qr(qr)
		} catch (e) {
			Modal.error({ content: e })
		}
		set_amount(0)
		set_loading(false)
	}

	return (
		<Fragment>
			<Row style={{ marginBottom: 5 }}>
				<Col>
					<Alert
						type="info"
						message="Thanh toán qua chức năng QRPAY của 32 ngân hàng và ví điện tử khác nhau, tiền được cộng tự động sau 20s"
					/>
				</Col>
			</Row>
			<Row>Nhập số tiền</Row>
			<Row>
				<Col span={16}>
					<InputNumberAutoSelect
						onChangeValue={a => {
							set_amount(a)
						}}
						defaultValue={0}
					/>
				</Col>
				<Col span={1}></Col>
				<Col span={6}>
					<Button loading={loading} onClick={create_deposit_request}>
						Lấy mã
					</Button>
				</Col>
				<Col span={1}></Col>
			</Row>
			{qr && (
				<Row style={{ padding: 20 }}>
					<Row>
						<Alert
							type="info"
							message="Dùng app ngân hàng trên điện thoại quét mã QRcode này hoặc bấm nút dưới để mở app điện thoại"
						/>
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
								onClick={() =>
									window.open(
										`https://1s71m8djfk.execute-api.us-east-1.amazonaws.com/production/vimo-payment?qrdata=${qr.qrdata}`,
									)
								}
							>
								Mở app
							</Button>
						</Col>
					</Row>
					<Row>
						<Alert
							type="warning"
							message="Tiền sẽ được cộng tự động khi thanh toán xong"
						/>
					</Row>
				</Row>
			)}
		</Fragment>
	)
}
