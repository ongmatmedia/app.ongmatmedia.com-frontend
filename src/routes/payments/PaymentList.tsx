import React, { Fragment } from 'react'
import { Table, Tag, Row, Col, Button } from 'antd'
import { PaymentHistory } from '../../schema/PaymentHistory/PaymentHistory'
import Moment from 'react-moment'

export type PaymentListProps = {
    onLoadMore: Function
    has_more: boolean
    search: string
    payment_histories: PaymentHistory[]
    loading: boolean
}


export const PaymentList = (props: PaymentListProps) => (
    <Fragment>
        <Table
            columns={[
                {
                    title: 'Time',
                    align: 'center',
                    render: (item: PaymentHistory) => (
                        <Row style={{ lineHeight: '2em' }}>
                            <Col xs={24} md={8}>
                                <Tag color="geekblue"> <Moment format="D/M/Y H:m">{item.time}</Moment></Tag>
                            </Col>
                            <Col xs={24} md={8}>
                                <Tag color="red">{item.service}</Tag>
                            </Col>
                            <Col xs={24} md={8}>
                                <Tag color="#108ee9">{item.total.toLocaleString(undefined)} đ</Tag>
                            </Col>

                        </Row>
                    )
                },
                {
                    title: 'Info',
                    align: 'right',
                    width: '50%',
                    render: (item: PaymentHistory) => (
                        <Row style={{ lineHeight: '2em' }} type="flex" justify="space-around" align="middle">
                            <Col xs={24} md={8}>
                                <Tag color="green"> $ = {item.balance_after.toLocaleString(undefined)} đ </Tag>
                            </Col>
                            <Col xs={24} md={4}>
                                {item.receiver_username != 'system' ? <Tag color="#108ee9">{item.receiver_username}</Tag> : null}
                            </Col>
                            <Col xs={24} md={10}>{item.note} </Col>
                        </Row>
                    )
                }
            ]}
            dataSource={
                props
                    .payment_histories
                    .filter(el => `${el.note} ${el.service} ${el.receiver_username}`.toLowerCase().includes(props.search.toLowerCase()))
            }
            pagination={false}
        />
        {
            props.has_more && (
                <Row type="flex" justify="space-around" align="middle"><Col>
                    <Button
                        loading={props.loading}
                        type="dashed"
                        icon="more"
                        style={{ margin: 10 }}
                        onClick={() => props.onLoadMore()}
                    >{props.loading ? 'Loading' : 'Show more'}</Button>
                </Col></Row>
            )
        }
    </Fragment>
)
