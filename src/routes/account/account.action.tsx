import React, { useState } from 'react'
import { Button } from 'antd'
import { AccountAddModal } from './account.add.modal'


export const AccountAction = () => {

    const [modal_visible, set_modal_visible] = useState<boolean>(false)

    return (
        <span>
            <AccountAddModal onClose={() => set_modal_visible(false)} visible={modal_visible} />
            <Button type="primary" icon="plus" onClick={() => set_modal_visible(true)}>Add account</Button>
        </span>
    )
}