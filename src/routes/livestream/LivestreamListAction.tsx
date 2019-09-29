import React, { useState } from 'react'
import { CreateEditLivestreamModal } from './CreateEditLivestreamModal'
import { Button } from 'antd'

export const LivestreamListAction = () => {

    const [create_modal_visible, set_create_modal_visible] = useState<boolean>(false)

    return (
        <span>
            <CreateEditLivestreamModal visible={create_modal_visible} onClose={() => set_create_modal_visible(false)} loading={false} />
            <Button icon="plus" type="primary" onClick={() => set_create_modal_visible(true)}>Add livestream schedule</Button>
        </span>
    )
}