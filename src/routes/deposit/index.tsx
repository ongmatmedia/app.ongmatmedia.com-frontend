import React from 'react'
import { Card, List, Avatar, Icon, Tooltip, Row, Col, Spin, Divider, message } from 'antd'
import { GraphQLWrapper } from '../../containers/GraphQLWrapper'
import { PaymentMethod } from '../../schema/User/PaymentMethod'
import { CopyToClipboard } from 'react-copy-to-clipboard';

const graphql = require('babel-plugin-relay/macro')

type DepositMethod = {
    name: string
    account: string
    cover: string
    icon: string
}

const query = graphql`
    query depositQuery{
        payment_methods{
            name
            owner
            description
            account
            image_url
        }
    }
`

export const DepositPage = GraphQLWrapper<{ payment_methods: PaymentMethod[] }>(query, {}, ({ loading, data }) => (
    <Card title="Deposit">
        {(!loading && data) ? (
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 1,
                    md: 4,
                    lg: 4,
                    xl: 4,
                    xxl: 4
                }}
                dataSource={data.payment_methods}
                renderItem={item => (
                    <List.Item>
                        <Card
                            size="small"
                            cover={<img src={item.image_url} />}
                            actions={[
                                <CopyToClipboard
                                    text={item.account}
                                    onCopy={() => message.info('Payment note copied')}
                                >
                                    <Tooltip title="Copy account" placement="bottom">
                                        <Icon type="copy" />
                                    </Tooltip>
                                </CopyToClipboard>
                            ]}
                        >
                            <Card.Meta
                                avatar={<Avatar src={item.image_url} />}
                                title={item.name}
                                description={
                                    <Row>
                                        <Col>{item.owner}</Col>
                                        <Col>{item.account}</Col>
                                        <Divider />
                                        <Col>{item.description}</Col>
                                    </Row>
                                }

                            />
                        </Card>
                    </List.Item>
                )}
            />
        ) : <Spin />}
    </Card>
))