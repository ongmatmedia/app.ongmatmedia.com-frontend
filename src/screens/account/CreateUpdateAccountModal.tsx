import { Form, Modal, Tabs, Collapse } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import React from 'react'
import { ChromeExtensionTab } from './facebook_tab/ChromeExtensionTab'
import { FacebookLoginTab } from './facebook_tab/FacebookLoginTab'
import { FacebookCookieTab } from './facebook_tab/FacebookCookieTab'
import { FacebookQR } from './facebook_tab/FacebookQR'

const { TabPane } = Tabs
const { Panel } = Collapse

const isMobileDevice = () => {
	return (
		navigator.userAgent.indexOf('IEMobile') !== -1 ||
		'ontouchstart' in window ||
		(navigator.msMaxTouchPoints && window.innerWidth < 760)
	)
}

export type CreateUpdateAccountModalProps = FormComponentProps & {
	visible: boolean
	onClose: Function
	accountId: string
	mode: 'create' | 'update'
}

export const CreateUpdateAccountModal = Form.create<
	CreateUpdateAccountModalProps
>()((props: CreateUpdateAccountModalProps) => (
	<Modal visible={props.visible} onCancel={() => props.onClose()} footer={null}>
		{!isMobileDevice() ? (
			<Tabs defaultActiveKey="1">
				<TabPane tab="Extension" key="1">
					<ChromeExtensionTab />
				</TabPane>
				<TabPane tab="App password" key="2">
					<FacebookLoginTab />
				</TabPane>
				<TabPane tab="Cookie" key="3">
					<FacebookCookieTab onCloseModal={props.onClose} />
				</TabPane>
				<TabPane tab="QRcode" key="4">
					<FacebookQR />
				</TabPane>
			</Tabs>
		) : (
			<Collapse defaultActiveKey={['1']}>
				<Panel header="Extension" key="1">
					<ChromeExtensionTab />
				</Panel>
				<Panel header="App password" key="2">
					<FacebookLoginTab />
				</Panel>
				<Panel header="Cookie" key="3" disabled>
					<FacebookCookieTab onCloseModal={props.onClose} />
				</Panel>
				<Panel header="QRcode" key="3" disabled>
					<FacebookQR />
				</Panel>
			</Collapse>
		)}
	</Modal>
))
