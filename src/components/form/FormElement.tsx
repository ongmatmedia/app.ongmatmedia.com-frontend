import React, { PropsWithChildren } from 'react'
import { Form, Row, Col, Icon, Tag } from 'antd'

export type FormItemProps = PropsWithChildren<{
    icon: string
    label: string
    right?: JSX.Element
    require?: boolean
}>

export const FormElement = (props: FormItemProps) => (
    <Form.Item>
        <Row type="flex" justify="space-between" align="middle">
            <Col>
                <h3>
                    <Icon type={props.icon} />
                    {props.label}
                    {props.require && <Tag style={{ background: '#fff', borderStyle: 'dashed' }}>Require</Tag>}
                </h3>
            </Col>
            <Col>
                {props.right}
            </Col>
        </Row>
        <Row>
            <Col>
                {props.children}
            </Col>
        </Row>
    </Form.Item>
)