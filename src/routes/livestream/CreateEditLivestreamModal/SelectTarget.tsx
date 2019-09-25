import React from 'react'

import { LivestreamTarget } from '../../../schema/Services/Livestream/LivestreamTarget'
import { useState } from 'react'
import { Card, Avatar, Col, Row } from 'antd'

export const SelectTarget = (props: { value?: LivestreamTarget, onChange?: Function }) => {
    const [target, set_target] = useState<LivestreamTarget>(props.value || { facebooks: [], rtmps: [] })
    const [target_choice_section_visible, set_target_choice_section_visible] = useState<boolean>(false)

    return (
        <span>
            <Card size="small" >
                <Row><Col span={12}>
                    <Avatar
                        src="https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png"
                        size={30}
                        style={{ marginRight: 10 }}
                    />
                    <span>Facebook profiles</span>
                </Col></Row>

                <Row style={{padding: 10}}>
                    <Col span={12}>
                        vdf.lk
                    </Col>
                </Row>


            </Card>
        </span>
    )
}