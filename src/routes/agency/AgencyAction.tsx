import React, { useState } from 'react'
import { Button } from 'antd'
import { CreateAgencyModal } from './CreateAgencyModal'
import { User } from '../../schema/User/User'
import { UpdatePriceAgenciesModal } from './UpdatePriceAgenciesModal'

export const AgencyAction = (props: { selectedAgencies: Set<User> }) => {

    const [add_user_modal_visible, set_add_user_modal_visible] = useState<boolean>(false)
    const [update_price_agencies_visible, set_update_price_agencies_visible] = useState<boolean>(false)

    return (
        <>
            <CreateAgencyModal onClose={() => set_add_user_modal_visible(false)} visible={add_user_modal_visible} />
            <UpdatePriceAgenciesModal onClose={() => set_update_price_agencies_visible(false)} visible={update_price_agencies_visible} selectedAgencies={props.selectedAgencies} />
            <Button type="primary" icon="plus" onClick={() => set_add_user_modal_visible(!add_user_modal_visible)}>Add agency</Button>
            <Button style={{ marginLeft: 10 }} type="primary" icon="edit" onClick={() => set_update_price_agencies_visible(!add_user_modal_visible)} disabled={props.selectedAgencies.size === 0}>
                Update price for selected agencies
            </Button>        
        </>
    )
}