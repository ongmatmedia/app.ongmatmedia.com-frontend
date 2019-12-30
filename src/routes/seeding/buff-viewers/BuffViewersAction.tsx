import { Button, Col, Icon, Input, notification, Row } from 'antd'
import React, { useState } from 'react'
import { FacebookAccount } from '../../../api/FacebookAccount'
import { BuffViewersCreateModal } from './BuffViewersCreateModal'

export type BuffViewersProps = {
    onChangeSearch: (v: string) => any
}

export const BuffViewersAction = (props: BuffViewersProps) => {
    const [create_modal_visible, set_create_modal_visible] = useState<boolean>(false)
    const [search, set_search] = useState<string>('')
    const [loading_uid, set_loading_uid] = useState<boolean>(false)

    const load_uid = async function () {
        try {
            set_loading_uid(true)
            const { uid } = await FacebookAccount.getUIDFromURL(search)
            set_search(uid)
        } catch (e) {
            set_search('')
            notification.error({ message: 'Can not get UID' })
        }
        set_loading_uid(false)
    }

    return (
        <Row type="flex" align="middle" justify="space-between" style={{ marginBottom: 10 }}>
            {
                create_modal_visible && <BuffViewersCreateModal onClose={() => set_create_modal_visible(false)} />
            }
            <Col style={{ paddingBottom: 5 }}>
                <Button type="primary" icon="plus" onClick={() => set_create_modal_visible(true)}>Buff now</Button>
            </Col>
            <Col xs={24} md={12} xxl={8} style={{ paddingBottom: 5 }}>
                <Input
                    addonAfter={<Icon type={loading_uid ? 'loading' : 'search'} onClick={load_uid} />}
                    placeholder="UID, name, URL search"
                    allowClear
                    value={search}
                    onChange={e => {
                        set_search(e.target.value)
                        props.onChangeSearch(e.target.value.toLowerCase())
                    }}
                />
            </Col>
        </Row>
    )
}