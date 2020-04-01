import React, { useState } from 'react'
import { Button, Checkbox, Tooltip, Row, Col } from 'antd'
import { CreateAgencyModal } from './CreateAgencyModal'
import { User } from '../../types'

interface AgencyActionProps {
	selectedAgencies: Set<User>
	onRemoveAllSelectedAgencies: Function
	onSelectAllAgencies: Function
	onOpenUpdatePriceAgenciesModal: Function
}

export const AgencyAction = (props: AgencyActionProps) => {
	// const [add_user_modal_visible, set_add_user_modal_visible] = useState<
	// 	boolean
	// >(false)

	return (
		<>
			{/* <CreateAgencyModal
				onClose={() => set_add_user_modal_visible(false)}
				visible={add_user_modal_visible}
			/> */}
			<Row type="flex" justify="space-between">
				<Col>
					{/* <Button
						type="primary"
						icon="plus"
						onClick={() => set_add_user_modal_visible(!add_user_modal_visible)}
						style={{ marginBottom: 20, marginRight: 10 }}
					>
						Add agency
					</Button> */}
					<Button
						style={{ marginBottom: 10 }}
						type="primary"
						icon="edit"
						onClick={() => props.onOpenUpdatePriceAgenciesModal()}
						disabled={props.selectedAgencies.size === 0}
					>
						{props.selectedAgencies.size === 0
							? 'Click to agency card for selecting'
							: 'Update price for selected agencies'}
					</Button>
				</Col>
				<Col>
					<Tooltip
						placement="top"
						title={
							props.selectedAgencies.size
								? 'Click to select all agencies'
								: 'Click to remove all selected agencies'
						}
					>
						<Checkbox
							checked={props.selectedAgencies.size > 0}
							style={{ float: 'left' }}
							onChange={() =>
								!props.selectedAgencies.size
									? props.onSelectAllAgencies()
									: props.onRemoveAllSelectedAgencies()
							}
						>
							Selected: {props.selectedAgencies.size}
						</Checkbox>
					</Tooltip>
				</Col>
			</Row>
		</>
	)
}
