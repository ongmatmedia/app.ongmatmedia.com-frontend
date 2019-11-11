import React, { useState } from 'react'
import { Row, Col, Input, Icon } from 'antd'
import { Button } from 'antd'
import { CUModal } from './CUModal'



export const VipViewersLivestreamAction = () => {
    const [CU_modal_visible, set_CU_modal_visible] = useState<boolean>(false)


    return (
        <Row type="flex" align="middle" justify="space-between" style={{ marginBottom: 10 }}>
            {
                CU_modal_visible && <CUModal onClose={() => set_CU_modal_visible(false)} mode="create" />
            }
            <Col style={{ paddingBottom: 5 }}>
                <Button type="primary" icon="plus" onClick={() => set_CU_modal_visible(true)}>Add VIP</Button>
                <Button style={{ marginLeft: 5 }} type="dashed" icon="download">Export excel</Button>
            </Col>
            <Col xs={24} md={12} xxl={8} style={{ paddingBottom: 5 }}>
                <Input
                    addonBefore={<Icon type="search" />}
                    placeholder="Search by name or UID"
                    allowClear
                />
            </Col>
        </Row>
    )
}