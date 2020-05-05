import Button from 'antd/lib/button'
import Checkbox from 'antd/lib/checkbox'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Tooltip from 'antd/lib/tooltip'
import React from 'react'
import {User} from '../../types'
import {Input, Icon} from 'antd'
import {Fab} from 'react-tiny-fab'

interface AgencyActionProps
{
	selectedAgencies: Set<User>
	onRemoveAllSelectedAgencies: Function
	onSelectAllAgencies: Function
	onOpenUpdatePriceAgenciesModal: Function
	onChangeSearchUsername: (username: string) => void
	updatePriceAgenciesModalVisible: boolean
}

export const AgencyAction = (props: AgencyActionProps) => (
	<>
		<Row>
			<Col xs={24}>
				<Row type="flex" justify="end" align="middle">
					<Col>
						<Checkbox
							checked={props.selectedAgencies.size > 0}
							style={{float: 'left'}}
							onChange={() =>
								!props.selectedAgencies.size
									? props.onSelectAllAgencies()
									: props.onRemoveAllSelectedAgencies()
							}
						>
							Selected: {props.selectedAgencies.size}
						</Checkbox>
					</Col>
				</Row>
				<Row type="flex" justify="end" align="middle">
					<Col xs={24} sm={12} lg={8}>
						<Input
							placeholder="Search by username"
							allowClear
							prefix={<Icon type="search" />}
							onChange={e =>
								props.onChangeSearchUsername(
									e.target.value.trim().toLocaleLowerCase(),
								)
							}
						/>
					</Col>
					{
						props.selectedAgencies.size !== 0 && !props.updatePriceAgenciesModalVisible && (
							<Fab
								mainButtonStyles={{backgroundColor: 'rgb(64, 169, 255)'}}
								icon={<Icon type="percentage" />}
								event="click"
								onClick={() => props.onOpenUpdatePriceAgenciesModal()}
							/>
						)
					}
				</Row>
			</Col>
		</Row>
	</>
)