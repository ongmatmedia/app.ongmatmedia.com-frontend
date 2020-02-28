import React, { PropsWithChildren } from 'react'
import { Form, Row, Col, Icon, Tag, Alert } from 'antd'

export type FormItemProps = PropsWithChildren<{
    icon: string
    label: string
    right?: JSX.Element
    require?: boolean
    error?:string
}>

export const FormElement = (props: FormItemProps) => (
    <Row style={{ marginBottom: 20 }}>
        <Row type="flex" justify="space-between" align="middle">
            <Col>
                <h3>
                    <Icon type={props.icon} />&nbsp;
                    {props.label}
                    &nbsp;
                    {props.require && <Tag style={{ background: '#fff', borderStyle: 'dashed' }}>Require</Tag>}
                </h3>
            </Col>
            <Col>
                <h3>{props.right}</h3>
            </Col>
        </Row>
        <Row>
            <Col>
                {props.children}
            </Col>
        </Row>
        {
            props.error && <Row><Alert type="error" message={props.error} style={{marginTop: 5}}/></Row>
        }
    </Row>
)