import React, { useState } from 'react'
import { Button } from 'antd'
import { CreateAgencyModal } from './CreateAgencyModal'

export const AgencyAction = () => {

    const [add_user_modal_visible, set_add_user_modal_visible] = useState<boolean>(false)


    return (
        <span> 
            <CreateAgencyModal onClose={() => set_add_user_modal_visible(false)} visible={add_user_modal_visible} />
            <Button type="primary" icon="plus" onClick={() => set_add_user_modal_visible(! add_user_modal_visible)}>Add agency</Button>
        </span>
    )
}