import { Card, Icon } from 'antd'
import React, { useState } from 'react'
import { BreadCrumb } from '../../../components/common/BreadCrumb'
import { BuffViewersLivestreamList } from './BuffViewersLivestreamList'
import { BuffViewersLivestreamCreateModal } from './BuffViewersLivestreamCreateModal'
import { Fab } from 'react-tiny-fab'
import { BuffViewersDetailModal } from './BuffViewersLivestreamDetailModal'

export const BuffViewersLivestream = () => {
	const [create_modal_visible, set_create_modal_visible] = useState<boolean>(
		false,
	)

	const [selectedBuffId, setSelectedBuffId] = useState<string>(null)

	return (
		<Card title={<BreadCrumb />} style={{minHeight: "100%"}}>
			<BuffViewersLivestreamList onSelectBuff={id => setSelectedBuffId(id)} />
			{create_modal_visible && (
				<BuffViewersLivestreamCreateModal
					onClose={() => set_create_modal_visible(false)}
				/>
			)}
			{!create_modal_visible && (
				<Fab
					mainButtonStyles={{ backgroundColor: 'rgb(64, 169, 255)' }}
					icon={<Icon type="plus" />}
					event="click"
					onClick={() => set_create_modal_visible(true)}
				></Fab>
			)}
			{selectedBuffId && (
				<BuffViewersDetailModal
					onClose={() => {
						setSelectedBuffId(null)
					}}
					video_id={selectedBuffId}
				/>
			)}
		</Card>
	)
}
