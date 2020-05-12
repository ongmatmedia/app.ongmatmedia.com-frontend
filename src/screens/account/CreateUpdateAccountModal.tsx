import Collapse from 'antd/lib/collapse'
import Form, {FormComponentProps} from 'antd/lib/form'
import Modal from 'antd/lib/modal'
import Tabs from 'antd/lib/tabs'
import React from 'react'
import {isMobile} from 'react-device-detect'
import {ChromeExtensionTab} from './facebook_tab/ChromeExtensionTab'
import {FacebookCookieTab} from './facebook_tab/FacebookCookieTab'
import {FacebookLoginTab} from './facebook_tab/FacebookLoginTab'
import {FacebookQR} from './facebook_tab/FacebookQR'

const {TabPane} = Tabs
const {Panel} = Collapse

export type CreateUpdateAccountModalProps = FormComponentProps & {
	onClose: Function
	mode: 'create' | 'update'
}

export const CreateUpdateAccountModal = Form.create<
	CreateUpdateAccountModalProps
>()((props: CreateUpdateAccountModalProps) => (
	<Modal
		visible
		onCancel={() => props.onClose()}
		footer={null}
		title={null}
		closeIcon={<></>}
		destroyOnClose
	>
		{!isMobile ? (
			<Tabs defaultActiveKey="1">
				<TabPane tab={`Extension`} key="1">
					<ChromeExtensionTab onCloseModal={props.onClose} />
				</TabPane>
				{/* <TabPane tab="App password" key="2">
					<FacebookLoginTab />
				</TabPane> */}
				<TabPane tab="Cookie" key="3">
					<FacebookCookieTab onCloseModal={props.onClose} />
				</TabPane>
				{/* <TabPane tab="QRcode" key="4">
					<FacebookQR />
				</TabPane> */}
			</Tabs>
		) : (
				<Collapse defaultActiveKey={['1']}>
					<Panel header="Extension" key="1">
						<ChromeExtensionTab onCloseModal={props.onClose} />
					</Panel>
					{/* <Panel header="App password" key="2">
					<FacebookLoginTab />
				</Panel> */}
					<Panel header="Cookie" key="3">
						<FacebookCookieTab onCloseModal={props.onClose} />
					</Panel>
					{/* <Panel header="QRcode" key="3" disabled>
					<FacebookQR />
				</Panel> */}
				</Collapse>
			)}
	</Modal>
))
