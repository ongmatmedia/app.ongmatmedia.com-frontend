import { Col, Icon, Input, Row } from 'antd'
import React from 'react'

export type VipViewersLivestreamActionProps = {
	onChangeSearch: (v: string) => void
}

export const VipViewersLivestreamAction = (
	props: VipViewersLivestreamActionProps,
) => (
	<Row style={{ marginBottom: 10 }}>
		<Col
			xs={24}
			sm={{ offset: 12, span: 12 }}
			md={{ offset: 16, span: 8 }}
			lg={{ offset: 18, span: 6 }}
			style={{ paddingBottom: 5 }}
		>
			<Input
				addonAfter={<Icon type="search" />}
				placeholder="Search by name or UID"
				allowClear
				onChange={e => {
					props.onChangeSearch(e.target.value.trim().toLowerCase())
				}}
			/>
		</Col>
	</Row>
)
